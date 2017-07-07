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
  "time"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome!")
}

/*return all activities*/
func ActivityIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(business.GetActivities()); err != nil {
		panic(err)
	}
}


/*return all leaf activities*/
func GetAllLeafs(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.WriteHeader(http.StatusOK)
  if err := json.NewEncoder(w).Encode(business.GetAllLeafs()); err != nil {
    panic(err)
  }
}

/*Says what kind of request should be accepted by the server*/
func Options(w http.ResponseWriter, r *http.Request) {
  fmt.Println("test");
  w.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
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

/*Gives all activities with a common parent*/
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
	activityId, _ := strconv.Atoi(vars["activity_Id"])
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(business.GetAllParents(activityId)); err != nil {
		panic(err)
	}
}

/*Create a new activity with given parameters*/
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

/*Update activity with given parameters*/
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


/*Delete the activity with given activity_id*/
func ActivityDelete(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    activityId, _ := strconv.Atoi(vars["activity_Id"])

    business.DeleteActivity(activityId)

    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.WriteHeader(http.StatusOK)
    if err := json.NewEncoder(w).Encode(business.GetAllParents(activityId)); err != nil {
    	panic(err)
   	}
}

/*return all timeLogs order by date desc*/
func TimeLogIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(business.GetTimeLogs()); err != nil {
		panic(err)
	}
}

/*Create a new TimeLog with given parameters*/
func TimeLogCreate(w http.ResponseWriter, r *http.Request) {
	var timeLog domain.TimeLog
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}
	fmt.Println(string(body));
	if err := json.Unmarshal(body, &timeLog); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

	tl := business.CreateTimeLog(timeLog)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(tl); err != nil {
		panic(err)
	}
}

/*Create a new journallog*/
func JournallogCreate (w http.ResponseWriter, r *http.Request) {

  var journallog domain.Journallog;
  body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
  if err != nil {
    panic(err)
  }

  if err := r.Body.Close(); err != nil {
    panic(err)
  }

  if err := json.Unmarshal(body, &journallog); err != nil {
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.WriteHeader(422) // unprocessable entity
    if err := json.NewEncoder(w).Encode(err); err != nil {
      panic(err)
    }
  }

  fmt.Println(string(body));
  jl := business.CreateJournallog(journallog)

  w.Header().Set("Content-Type", "application/json; charset=UTF-8")
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.WriteHeader(http.StatusCreated)
  if err := json.NewEncoder(w).Encode(jl); err != nil {
    panic(err)
  }
}

/*Get all journallogs for a given date*/
func GetJournallogForDate(w http.ResponseWriter, r *http.Request) {
  vars := mux.Vars(r)
  fmt.Println(vars["jl_date"])
  date, err := time.Parse("20060102", vars["jl_date"])
  if err != nil {
    panic(err)
  }

  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.WriteHeader(http.StatusOK)
  if err := json.NewEncoder(w).Encode(business.GetJournallogForDate(date)); err != nil {
    panic(err)
  }
}
