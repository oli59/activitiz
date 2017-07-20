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
		"/allParents/{activity_Id}",
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
    		"/activities/{activity_Id}",
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
    		"/activities/{activity_Id}",
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


  /*JournalLogs*/
  Route{
    "JournallogCreate",
    "POST",
    "/journal_log",
    JournallogCreate,
  },

  Route{
    "Options",
    "OPTIONS",
    "/journal_log",
    Options,
  },

  Route{
    "OptionsDate",
    "OPTIONS",
    "/journal_log/{jl_date}",
    Options,
  },

  Route{
    "GetJournallogForDate",
    "GET",
    "/journal_log/{jl_date}",
    GetJournallogForDate,
  },

  Route{
    "OptionsNDate",
    "OPTIONS",
    "/journal_log/next/{jl_date}",
    Options,
  },

  Route{
    "GetJournallogForNextDate",
    "GET",
    "/journal_log/next/{jl_date}",
    GetJournallogForNextDate,
  },



}
