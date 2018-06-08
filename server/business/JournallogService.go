package business

import (
  "github.com/oli59/activitiz/server/domain"
  "github.com/oli59/activitiz/server/dao"
  "time"
  "database/sql"
  "math/rand"
  "errors"
  "log"
  "strings"
  "strconv"
)

func CreateJournallog (a domain.Journallog) domain.Journallog {
  return dao.CreateJournallog(a)
}

func GetJournallogForDate(date time.Time) domain.Journallogs {
  return dao.GetJournallogForDate(date);
}

func GetJournallogAfterDate(date time.Time) domain.Journallogs {
  return dao.GetJournallogAfterDate(date);
}

func GetJournallogForNextDate(date time.Time) domain.Journallogs {
  return dao.GetJournallogForNextDate(date);
}

func UpdateJournallog (jl domain.Journallog) error {
  return dao.UpdateJournallog(jl)
}

func Schedule(maxActivities int, date time.Time) domain.Journallogs {
  var scheduledJl domain.Journallogs
  journallogsForDate := GetJournallogForDate(date);
  journallogsAfterDate := GetJournallogAfterDate(date)
  rand.Seed(time.Now().UTC().UnixNano())

  /*schedule by frequency*/
  frequencyJl := ScheduleByFrequency(date);
  scheduledJl = append(scheduledJl, frequencyJl[0:]...);

  //Schedule Automatic and by deadline
  loopCount := 0;
  timeIsRunningOut := false;

  schedulableActivities := dao.GetAllSchedulableLeafs();
  schedulableActivities = removeAllActivities(schedulableActivities, journallogsForDate);
  schedulableActivities = removeAllActivities(schedulableActivities, journallogsAfterDate);

  schedulableByDeadLine := dao.GetAllSchedulableByDeadLine();
  schedulableByDeadLine = removeAllActivities(schedulableByDeadLine, journallogsForDate);
  schedulableByDeadLine = removeAllActivities(schedulableByDeadLine, journallogsAfterDate);

  openJournallogsCount := countOpenJournallogs(journallogsForDate);

  for ((loopCount < 1 && len(scheduledJl) == 0) || ((loopCount + openJournallogsCount < maxActivities) && !timeIsRunningOut)) {
    //choose randomly between Automatic and by deadLine
    loopCount++;
    randomChooser := rand.Intn(2);
    var jl domain.Journallog;
    var error error;


    //schedule by deadline
    if (randomChooser == 0 || len(schedulableActivities) == 0) && len(schedulableByDeadLine) > 0 {
      jl = CreateJournallogForActivity(schedulableByDeadLine[0], date);
      schedulableByDeadLine = append(schedulableByDeadLine[:0], schedulableByDeadLine[1:]...)

      //or schedule Automatic
    } else if len(schedulableActivities) > 0 {

      jl, error = ScheduleAutomatic(schedulableActivities);
      if error != nil {
        log.Print(error);
        return scheduledJl;
      }
      schedulableActivities = removeActivityById(schedulableActivities, jl.ActivityId.Int64);
      //no scheduling possible
    } else {break;}

    //save to db and add to returned journallog list
    scheduledJl = append(scheduledJl, jl);
    dao.CreateJournallog(jl);
    journallogsForDate = append(journallogsForDate, jl);

    timeIsRunningOut = IsTimeRunningOut(journallogsForDate);
  }
  return scheduledJl;
}


/*Schedule one automatic activity*/
func ScheduleAutomatic(schedulableActivities domain.Activities) (domain.Journallog, error) {
  var resultJl domain.Journallog ;
  var sumCurrentPoint int64= 0;
  var sumTypicalPoint int64= 0;

  for _, activity := range schedulableActivities {
    if activity.CurrentPoints.Valid && activity.CurrentPoints.Int64 > 0 {
      sumCurrentPoint += activity.CurrentPoints.Int64;
    }
    if activity.TypicalDuration.Valid {
      sumTypicalPoint += activity.TypicalDuration.Int64;
    }
  }

  //If total current points < 1/2 total typical points => 1/2 typical points to all activities
  if sumCurrentPoint < sumTypicalPoint / 2 {
    sumCurrentPoint = 0;
    for _, activity := range schedulableActivities {
      if activity.CurrentPoints.Valid {
        activity.CurrentPoints.Int64 += int64(activity.TypicalDuration.Int64 / 2)
      } else {
        activity.CurrentPoints.Valid = true;
        activity.CurrentPoints.Int64 = activity.TypicalDuration.Int64
      }
      if activity.CurrentPoints.Int64 > 0 {
        sumCurrentPoint = sumCurrentPoint + activity.CurrentPoints.Int64;
      }
    }
    UpdateAutomaticallySchedulledActivityPoints();
  }


  //Randomally choose an activity (activities with bigger CurrentPoints have a bigger chance to be picked
  var indexPoint int64;
  if (sumCurrentPoint > 0) {
    indexPoint = rand.Int63n(sumCurrentPoint);
  } else {return resultJl, errors.New("nothing to schedule")}
  chosenActivityIndex := -1;

  for (indexPoint > 0) {
    chosenActivityIndex += 1;
    if chosenActivityIndex >= len(schedulableActivities) {
      break;
    }
    activity := schedulableActivities[chosenActivityIndex];
    if activity.CurrentPoints.Int64 > 0 {
      indexPoint -= activity.CurrentPoints.Int64;
    }
  }

    resultJl = domain.Journallog{1, time.Now(), "open",
    domain.JsonNullInt64{sql.NullInt64{Int64:int64(schedulableActivities[chosenActivityIndex].Id), Valid:true}},
    domain.JsonNullInt64{sql.NullInt64{Int64:-1, Valid:false}},
    schedulableActivities[chosenActivityIndex].Name, ""};
    return resultJl, nil;
}

/*remove (if exist) activity with Id given as a second parameter from activity table given as a first parameter*/
func removeActivityById(s domain.Activities, actId int64) domain.Activities {
  for i, activity := range s {
    if int64(activity.Id) == actId {
      return append(s[:i], s[i+1:]...);
    }
  }
  return s;
}

/*remove (if exist) all activities in journallogs given as second parameter from the table given as first parameter */
func removeAllActivities(s domain.Activities, jls domain.Journallogs) domain.Activities {
  result := s;
  for _, jl := range jls {
    if jl.ActivityId.Valid {
      result = removeActivityById(result, jl.ActivityId.Int64);
    }
  }
  return result;
}

/*count number of journallogs 'open' in a list*/
func countOpenJournallogs(jls domain.Journallogs) int {
  result := 0;
  for _, jl := range jls {
    if jl.Status == "open" {
      result++;
    }
  }

  return result;
}

/*check if time is running out to add new items to the journallogs*/
func IsTimeRunningOut(jls domain.Journallogs) bool {
    today := time.Now();

    usableDuration := 22*60 - today.Hour() * 60 - today.Minute() - 40;

    for _, jl := range jls {
      if jl.Status == "open" && jl.ActivityId.Valid {
        act := dao.GetActivity(int(jl.ActivityId.Int64))
        if act.TypicalDuration.Valid  {
          usableDuration -= int(act.TypicalDuration.Int64);
        }
      }
    }

    return (usableDuration < 0);
}

/*create a new journal log for and activity (not saved in db)*/
func CreateJournallogForActivity (act domain.Activity, date time.Time ) domain.Journallog {
  resultJl := domain.Journallog{1, date, "open",
    domain.JsonNullInt64{sql.NullInt64{Int64:int64(act.Id), Valid:true}},
    domain.JsonNullInt64{sql.NullInt64{Int64:-1, Valid:false}},
    act.Name, ""};
  return resultJl;
}

func ScheduleByFrequency(date time.Time) domain.Journallogs {
  var result domain.Journallogs;
  journallogsForDate := GetJournallogForDate(date)

  schedulableActivities := dao.GetAllSchedulableByFrequency();
  schedulableActivities = removeAllActivities(schedulableActivities, journallogsForDate);

  for _, act := range schedulableActivities {
    //scheduling when period = Day
    if (act.SchedulingPeriod == "Day") {
      //every day => add the jl
      if act.SchedulingPace.Valid && act.SchedulingPace.Int64 == 1 {
        jl := CreateJournallogForActivity(act, date);
        dao.CreateJournallog(jl)
        result = append(result, jl);
      // else check if we are over the pace
      } else {
        lastScheduled := dao.GetLastScheduledDateForActivity(act.Id);
        if act.SchedulingPace.Valid && int64(domain.DiffDays(lastScheduled, date)) >= act.SchedulingPace.Int64 {
          jl := CreateJournallogForActivity(act, date);
          dao.CreateJournallog(jl)
          result = append(result, jl);
        }
      }
    }
    //Scheduling when period = Week
    if (act.SchedulingPeriod == "Week") {
      //get the week day for the date of the scheduling
      dayOfWeek := int(date.Weekday()) - 1;
      if dayOfWeek == -1 {
        dayOfWeek = 6;
      }
      //this activity is schedulable for this day of week, check pace
      if (act.SchedulingDetail[dayOfWeek] == '1') {
        //check if activity was sheduled in the last Pace weeks on the same dayOfWeek
        found := false;
        for i := 1; int64(i) < act.SchedulingPace.Int64 && !found; i++ {
          dateToCheck := date.AddDate(0,0, i*-7);
          jlsToCheck := dao.GetJournallogForDate(dateToCheck);
          for _, jlToCheck := range jlsToCheck {
            if jlToCheck.ActivityId.Valid && jlToCheck.ActivityId.Int64 ==int64(act.Id) {
              found = true;
            }
          }
        }
        //not schedulated in the last Pace weeks, schedule it for this date
        if (!found) {
          jl := CreateJournallogForActivity(act, date);
          dao.CreateJournallog(jl)
          result = append(result, jl);
        }
      }
    }

    //Scheduling when period = Month
    if (act.SchedulingPeriod == "Month") {
      //get the day of the month for the date that's being scheduled
      dayOfMonth := date.Day();

      //check if this activty is schedulable for that dayOfMonth
      schedulingAllowedDays := strings.FieldsFunc(act.SchedulingDetail, func(r rune) bool {
        if r == ';' {
          return true
        }
        return false
      })

      found := false;
      for _, stringDay := range schedulingAllowedDays {
        day, err := strconv.Atoi(stringDay);
        if err != nil {
          panic(err)
        }
        if dayOfMonth == day {
          found = true;
          break;
        }
      }

      //this activity is schedulable for this day of month, check pace
      if found {
        //check if activity was sheduled in the last Pace month on the same dayOfMonth
        foundInMonth := false;
        for i := 1; int64(i) < act.SchedulingPace.Int64 && !foundInMonth; i++ {
          dateToCheck := date.AddDate(0,-1*i, 0);
          jlsToCheck := dao.GetJournallogForDate(dateToCheck);
          for _, jlToCheck := range jlsToCheck {
            if jlToCheck.ActivityId.Valid && jlToCheck.ActivityId.Int64 ==int64(act.Id) {
              foundInMonth = true;
            }
          }
        }
        //not schedulated in the last Pace months, schedule it for this date
        if (!foundInMonth) {
          jl := CreateJournallogForActivity(act, date);
          dao.CreateJournallog(jl)
          result = append(result, jl);
        }
      }
    }
  }
  return result;
}
