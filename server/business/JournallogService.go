package business

import (
  "github.com/oli59/activitiz/server/domain"
  "github.com/oli59/activitiz/server/dao"
  "time"
  "database/sql"
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
  //journallogsForDate := GetJournallogForDate(date);
  //TODO: Schedule by Frequency

  //TODO 1 calculate remaining time

  //TODO tant que il reste du temps ou que le maxActivites n'est pas dépassé

  //Random par type Auto ou DL

  scheduledJl = append (scheduledJl, ScheduleAutomatic())
  fmt.Println(scheduledJl);

  dao.CreateJournallog(scheduledJl[0]);

  return scheduledJl;
}

/*Schedule one automatic activity*/
func ScheduleAutomatic() domain.Journallog {
  var sumCurrentPoint int64= 0;
  var sumTypicalPoint int64= 0;
  schedulableActivities := dao.GetAllSchedulableLeafs();

  for _, activity := range schedulableActivities {
    if activity.CurrentPoints.Valid {
      sumCurrentPoint += activity.CurrentPoints.Int64;
    }
    if activity.TypicalDuration.Valid {
      sumTypicalPoint += activity.TypicalDuration.Int64;
    }
  }

  //If total current points < 1/2 total typical points => 1/2 typical points to all activities
  if sumCurrentPoint < sumCurrentPoint / 2 {
    for _, activity := range schedulableActivities {
      activity.CurrentPoints += int64(activity.TypicalDuration/2)
      UpdateActivity(activity);
    }
  }

  return domain.Journallog{1, time.Now(), "new",
    domain.JsonNullInt64{sql.NullInt64{Int64:int64(schedulableActivities[0].Id), Valid:true}},
    domain.JsonNullInt64{sql.NullInt64{Int64:1, Valid:false}},
    schedulableActivities[0].Name, ""};
}
