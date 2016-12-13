package domain

import (
	"database/sql"
    	"encoding/json"
	"errors"
	"time"
)

/*nullable int*/
type JsonNullInt64 struct {
	sql.NullInt64
}

func (v JsonNullInt64) MarshalJSON() ([]byte, error) {
	if v.Valid {
		return json.Marshal(v.Int64)
	} else {
		return json.Marshal(nil)
	}
}

func (v *JsonNullInt64) UnmarshalJSON(data []byte) error {
	var x *int64

	if err := json.Unmarshal(data, &x); err != nil {
		return err
	}
	if x != nil {
		v.Valid = true
		v.Int64 = *x
	} else {
		v.Valid = false
	}
	return nil
}


/*time that can be used without a day with the format 10:05*/
var timeLayout = "15:04"
var TimeParseError = errors.New(`TimeParseError: should be a string formatted as "15:04:05"`)

type HourMinute struct {
	time.Time
}

func (hm HourMinute) MarshalJSON() ([]byte, error) {
	return []byte(`"` + hm.Format(timeLayout) + `"`), nil
}

func (hm *HourMinute) UnmarshalJSON(b []byte) error {
	s := string(b)
	// len(`"23:59"`) == 7
	if len(s) != 7 {
		return TimeParseError
	}
	ret, err := time.Parse(timeLayout, s[1:6])
	if err != nil {
		return err
	}
	hm.Time = ret
	return nil
}