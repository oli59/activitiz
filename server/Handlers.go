package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"encoding/json"
	"io/ioutil"
	"io"

	"github.com/oli59/activitiz/server/domain"
	"github.com/oli59/activitiz/server/business"
	"strconv"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome!")
}

func ActivityIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(business.GetActivities()); err != nil {
		panic(err)
	}
}

func Options(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Accept", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, PUT, POST, DELETE, GET")
	/*
	if err := json.NewEncoder(w).Encode(dao.GetActivities()); err != nil {
		panic(err)
	}
	*/
}

func ActivitiesByParent(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	activityId, _ := strconv.Atoi(vars["parentActivityId"])
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(business.GetActivitiesByParent(activityId)); err != nil {
		panic(err)
	}
}


/*Get all parents for activity given as a parameter*/
func GetAllParents(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	activityId, _ := strconv.Atoi(vars["activityId"])
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(business.GetAllParents(activityId)); err != nil {
		panic(err)
	}
}

func ActivityCreate(w http.ResponseWriter, r *http.Request) {
	var activity domain.Activity
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}
	if err := json.Unmarshal(body, &activity); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}
	fmt.Println(string(body));
	a := business.CreateActivity(activity)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(a); err != nil {
		panic(err)
	}
}

func ActivityUpdate(w http.ResponseWriter, r *http.Request) {
	var activity domain.Activity
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}
	if err := json.Unmarshal(body, &activity); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

	a := business.UpdateActivity(activity)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(a); err != nil {
		panic(err)
	}
}


func ActivityDelete(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    activityId, _ := strconv.Atoi(vars["activityId"])

    business.DeleteActivity(activityId)

    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.WriteHeader(http.StatusOK)
    if err := json.NewEncoder(w).Encode(business.GetAllParents(activityId)); err != nil {
    	panic(err)
   	}



}