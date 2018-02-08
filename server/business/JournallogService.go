package business

import (
  "github.com/oli59/activitiz/server/domain"
  "github.com/oli59/activitiz/server/dao"
  "time"
  "database/sql"
  "math/rand"
  "errors"
  "fmt"
)

func CreateJournallog (a domain.Journallog) domain.Journallog {
  return dao.CreateJournallog(a)
}

func GetJournallogForDate(date time.Time) domain.Journallogs {
  return dao.GetJournallogForDate(date);
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
  //TODO: Schedule by Frequency

  //TODO 1 calculate remaining time

  //TODO tant que il reste du temps ou que le maxActivites n'est pas dépassé

  //TODO Random par type Auto ou DL

  //Automatic Scheduling
  schedulableActivities := dao.GetAllSchedulableLeafs();
  schedulableActivities = removeAllActivities(schedulableActivities, journallogsForDate);
  jl, error := ScheduleAutomatic(schedulableActivities);
  if error != nil {
    fmt.Println(error);
    return scheduledJl;
  }
  scheduledJl = append (scheduledJl, jl);
  schedulableActivities = removeActivityById(schedulableActivities, jl.ActivityId.Int64);
  dao.CreateJournallog(scheduledJl[0]);

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

  for (indexPoint > 0 && ) {
    chosenActivityIndex += 1;
    if chosenActivityIndex >= chosenActivityIndex < len(schedulableActivities) {
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
      s[len(s)-1], s[i] = s[i], s[len(s)-1];
      return s[:len(s)-1];
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

