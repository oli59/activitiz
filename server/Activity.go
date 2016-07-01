package main

type Activity struct {
	Id 	int             `json:"id"`
	Name    string		`json:"name"`
	Status  string		`json:"due"`
}

type Activities []Activity