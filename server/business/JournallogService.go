package business

import (
  "github.com/oli59/activitiz/server/domain"
  "github.com/oli59/activitiz/server/dao"
  "time"
  "database/sql"
  "fmt"
  "math/rand"
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

  //TODO Random par type Auto ou DL

  //Automatic Scheduling
  schedulableActivities := dao.GetAllSchedulableLeafs();
  //TODO supprimer de la liste toutes les activities qui sont déjà dans un journallog du jour
  jl := ScheduleAutomatic(schedulableActivities);
  scheduledJl = append (scheduledJl, jl);
  //todo retirer jl de la liste des activité schedulables

  dao.CreateJournallog(scheduledJl[0]);

  return scheduledJl;
}

/*Schedule one automatic activity*/
func ScheduleAutomatic(schedulableActivities domain.Activities) domain.Journallog {
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
      UpdateActivity(activity);
    }
  }

  //Randomally choose an activity (activities with bigger CurrentPoints have a bigger chance to be picked
  var indexPoint int64 = rand.Int63n(sumCurrentPoint);
  chosenActivityIndex := -1;
  for (indexPoint > 0) {
    chosenActivityIndex += 1;
    activity := schedulableActivities[chosenActivityIndex];
    if activity.CurrentPoints.Int64 > 0 {
      indexPoint -= activity.CurrentPoints.Int64;
    }
  }


  return domain.Journallog{1, time.Now(), "new",
    domain.JsonNullInt64{sql.NullInt64{Int64:int64(schedulableActivities[chosenActivityIndex].Id), Valid:true}},
    domain.JsonNullInt64{sql.NullInt64{Int64:-1, Valid:false}},
    schedulableActivities[chosenActivityIndex].Name, ""};
}
