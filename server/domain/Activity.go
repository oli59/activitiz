package domain

import "time"

type Activity struct {
	Id 	  	        int              `json:"id"`
	ParentId	      JsonNullInt64	   `json:"parent_id"`
	Name    	      string		       `json:"name"`
	Status    	    string		       `json:"status"`
  SchedulingMode  string           `json:"scheduling_mode"`
  TypicalDuration JsonNullInt64    `json:"typical_duration"`
  CurrentPoints   JsonNullInt64    `json:"current_points"`
  Deadline        *time.Time       `json:"deadline"`

}

type Activities [] Activity;
