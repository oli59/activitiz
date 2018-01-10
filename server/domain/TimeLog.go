package domain

import (
	"time"
)

type TimeLog struct {
	Id 	        int                 `json:"id"`
	Date        time.Time           `json:"date"`
  StartHour   HourMinute          `json:"start_hour"`
  EndHour     HourMinute          `json:"end_hour"`
  Duration    float64             `json:"duration"`
	ActivityId  JsonNullInt64       `json:"activity_id"`
  Comment     string              `json:"comment"`
	Name        string              `json:"name"`


}

type TimeLogs [] TimeLog;





