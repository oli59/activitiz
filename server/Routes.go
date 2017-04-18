package main

import (
	"net/http"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes [] Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"ActivityIndex",
		"GET",
		"/activities",
		ActivityIndex,
	},
	Route{
		"ActivitiesByParent",
		"GET",
		"/activities/{parentActivityId}",
		ActivitiesByParent,
	},
	Route{
		"GetAllParents",
		"GET",
		"/allParents/{activityId}",
		GetAllParents,
	},
  Route{
    "GetAllLeafs",
    "GET",
    "/allLeafs",
    GetAllLeafs,
  },
	Route{
		"ActivityCreate",
		"POST",
		"/activities",
		ActivityCreate,
	},

	Route{
		"ActivityUpdate",
		"PUT",
		"/activities",
		ActivityUpdate,
	},

	Route{
    		"ActivityDelete",
    		"DELETE",
    		"/activities/{activityId}",
    		ActivityDelete,
    },

  Route{
		"OptionsAL",
		"OPTIONS",
		"/allLeafs",
		Options,
	},

  Route{
    "Options",
    "OPTIONS",
    "/activities",
    Options,
  },

	Route{
    		"OptionsId",
    		"OPTIONS",
    		"/activities/{activityId}",
    		Options,
    },

    Route{
    		"OptionsTL",
    		"OPTIONS",
    		"/time_log",
    		Options,
    },
    Route{
    		"TimeLogCreate",
    		"POST",
    		"/time_log",
    		TimeLogCreate,
    	},

    Route{
      		"TimeLogIndex",
       		"GET",
       		"/time_log",
       		TimeLogIndex,
   	},
}
