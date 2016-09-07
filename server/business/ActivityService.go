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