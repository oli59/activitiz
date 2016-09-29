package business

import (
	"github.com/oli59/activitiz/server/domain"
	"github.com/oli59/activitiz/server/dao"
)

func GetTimeLogs () domain.TimeLogs {
	return dao.GetTimeLogs()
}

func CreateTimeLog (tl domain.TimeLog) domain.TimeLog {
	return dao.CreateTimeLog(tl)
}