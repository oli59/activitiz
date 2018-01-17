package business

import (
	"github.com/oli59/activitiz/server/domain"
	"github.com/oli59/activitiz/server/dao"
)

func UpdateActivity (act domain.Activity) error {
	return dao.UpdateActivity(act)
}

func DeleteActivity (activityId int) error {
	return dao.DeleteActivity(activityId)
}

func GetActivity (activityId int) domain.Activity {
  return dao.GetActivity(activityId)
}

func CreateActivity (a domain.Activity) domain.Activity {
	return dao.CreateActivity(a)
}

func GetActivities () domain.Activities {
	return dao.GetActivities()
}

func GetActivitiesByParent (actId int) domain.Activities {
	return dao.GetActivitiesByParent(actId)
}

func GetAllParents (actId int) domain.Activities {
	return dao.GetAllParents(actId)
}

func GetAllLeafs () domain.Activities {
  return dao.GetAllLeafs()
}

func UpdateAutomaticallySchedulledActivityPoints() {
  schedulableActivities := dao.GetAllSchedulableLeafs();
  for _, activity := range schedulableActivities {
    if activity.CurrentPoints.Valid {
      activity.CurrentPoints.Int64 += int64(activity.TypicalDuration.Int64 / 2)
    } else {
      activity.CurrentPoints.Valid = true;
      activity.CurrentPoints.Int64 = activity.TypicalDuration.Int64
    }
    UpdateActivity(activity);
  }
}

