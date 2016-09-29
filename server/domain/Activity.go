package domain

type Activity struct {
	Id 	  	int             `json:"id"`
	ParentId	JsonNullInt64	`json:"parent_id"`
	Name    	string		`json:"name"`
	Status    	string		`json:"status"`
}

type Activities [] Activity;