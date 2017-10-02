package business

import (
	"github.com/oli59/activitiz/server/domain"
	"github.com/oli59/activitiz/server/dao"
  "net/url"
)

func GetTimeLogs (parameters url.Values) domain.TimeLogs {
	return dao.GetTimeLogs(parameters)
}

func CreateTimeLog (tl domain.TimeLog) domain.TimeLog {
	tl.Duration = CalculateDuration(tl);
	return dao.CreateTimeLog(tl);
}

func CalculateDuration (tl domain.TimeLog) float64 {
	Duration := tl.EndHour.Time.Sub(tl.StartHour.Time);
	return Duration.Hours();
}
