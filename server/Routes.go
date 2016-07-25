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
		"Options",
		"OPTIONS",
		"/activities",
		Options,
	},
}