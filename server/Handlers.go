package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"encoding/json"
	"io/ioutil"
	"io"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome!")
}

func ActivityIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(activities); err != nil {
		panic(err)
	}
}

func Options(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Accept", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, PUT, POST, DELETE, GET")
	w.WriteHeader(200)
	if err := json.NewEncoder(w).Encode(activities); err != nil {
		panic(err)
	}
}

func ActivityShow(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	activityId := vars["activityId"]
	fmt.Fprintln(w, "Activity show:", activityId)
}

func ActivityCreate(w http.ResponseWriter, r *http.Request) {
	var activity Activity
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

	a := RepoCreateTodo(activity)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(a); err != nil {
		panic(err)
	}
}

func ActivityUpdate(w http.ResponseWriter, r *http.Request) {
	var activity Activity
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

	a := RepoUpdateTodo(activity)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(a); err != nil {
		panic(err)
	}
}