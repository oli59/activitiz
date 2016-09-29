package domain

import (
	"time"
)

type TimeLog struct {
	Id 	  	    int                 `json:"id"`
	Date    	time.Time           `json:"date"`
    StartHour   time.Time           `json:"start_hour"`
    EndHour     time.Time           `json:"end_hour"`
    Duration    time.Duration       `json:"duration"`
    ActivityId  JsonNullInt64       `json:"activity"`
    Comment     string              `json:"comment"`

}

type TimeLogs [] TimeLog;





