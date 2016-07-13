package domain

type Activity struct {
	Id 	int             `json:"id"`
	Name    string		`json:"name"`
	Status  string		`json:"status"`
}

type Activities [] Activity