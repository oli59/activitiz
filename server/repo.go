package main

import "fmt"

var currentId int

var activities Activities

// Give us some seed data
func init() {
	RepoCreateTodo(Activity{Name: "JSON WEb Tokens for authentification", Status: "new"})
	RepoCreateTodo(Activity{Name: "not this", Status: "cancelled"})
	RepoCreateTodo(Activity{Name: "Go rest server", Status: "done"})
	RepoCreateTodo(Activity{Name: "Database", Status: "new"})
	RepoCreateTodo(Activity{Name: "json server api", Status: "new"})
	RepoCreateTodo(Activity{Name: "Format tiles", Status: "new"})
	RepoCreateTodo(Activity{Name: "routing parent/child", Status: "new"})
	RepoCreateTodo(Activity{Name: "add new / modify", Status: "new"})
	RepoCreateTodo(Activity{Name: "change status", Status: "new"})
	RepoCreateTodo(Activity{Name: "split css/html/ts files", Status: "new"})
	RepoCreateTodo(Activity{Name: "handle server errors on angular side", Status: "new"})
	RepoCreateTodo(Activity{Name: "trim useless http methods from go server", Status: "new"})
	RepoCreateTodo(Activity{Name: "check bootstraps css + angular material for templates", Status: "new"})
}

func RepoFindActivity(id int) Activity {
	for _, a := range activities {
		if a.Id == id {
			return a
		}
	}
	// return empty Todo if not found
	return Activity{}
}

func RepoCreateTodo(a Activity) Activity {
	currentId += 1
	a.Id = currentId
	activities = append(activities, a)
	return a
}

func RepoDestroyTodo(id int) error {
	for i, a := range activities {
		if a.Id == id {
			activities = append(activities[:i], activities[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Could not find Activity with id of %d to delete", id)
}

func RepoUpdateTodo(act Activity) error {
	for i, a := range activities {
		if a.Id == act.Id {
			activities = append(append(activities[:i], act) , activities[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Could not find Activity with id of %d to delete", act.Id)
}