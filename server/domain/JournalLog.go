package domain

import (
"time"
)

type Journallog struct {
  Id 	        int                 `json:"id"`
  Date        time.Time           `json:"date"`
  Status      string	          	`json:"status"`
  ActivityId  JsonNullInt64       `json:"activity_id"`
  TimeLogId   JsonNullInt64       `json:"timelog_id"`
  Name        string              `json:"name"`
}

type Journallogs [] Journallog;
