package domain

import (
	"database/sql"
	"encoding/json"
)

type Activity struct {
	Id 	  	int             `json:"id"`
	ParentId	JsonNullInt64	`json:parent_id`
	Name    	string		`json:"name"`
	Status    	string		`json:"status"`
}

type Activities [] Activity

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