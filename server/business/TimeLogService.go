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

  if tl.ActivityId.Valid {
    activity := GetActivity(int(tl.ActivityId.Int64));
    if activity.SchedulingMode == "Automatic" {
        if activity.CurrentPoints.Valid {
          activity.CurrentPoints.Int64 = activity.CurrentPoints.Int64 - int64(tl.Duration * 60)
        } else {
        activity.CurrentPoints.Valid = true;
        activity.CurrentPoints.Int64 = 0;
      }
    UpdateActivity(activity);
    }
  }

	return dao.CreateTimeLog(tl);
}

func CalculateDuration (tl domain.TimeLog) float64 {
	Duration := tl.EndHour.Time.Sub(tl.StartHour.Time);
	return Duration.Hours();
}
