package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"encoding/json"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome!")
}

func ActivityIndex(w http.ResponseWriter, r *http.Request) {

	activities := Activities{
		Activity{Name: "test1"},
		Activity{Name: "test2"},
	}

	json.NewEncoder(w).Encode(activities)
}

func ActivityShow(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	activityId := vars["activityId"]
	fmt.Fprintln(w, "Activity show:", activityId)
}