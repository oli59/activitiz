package main

import "fmt"

var currentId int

var activities Activities

// Give us some seed data
func init() {
	RepoCreateTodo(Activity{Name: "JSON WEb Tokens for authentification", Status: "new"})
	RepoCreateTodo(Activity{Name: "not this", Status: "cancelled"})
	RepoCreateTodo(Activity{Name: "not this", Status: "Go rest server"})
	RepoCreateTodo(Activity{Name: "Database", Status: "new"})
	RepoCreateTodo(Activity{Name: "json server api", Status: "new"})
	RepoCreateTodo(Activity{Name: "Format tiles", Status: "new"})
	RepoCreateTodo(Activity{Name: "routing parent/child", Status: "new"})
	RepoCreateTodo(Activity{Name: "add new / modify", Status: "new"})
	RepoCreateTodo(Activity{Name: "change status", Status: "new"})
	RepoCreateTodo(Activity{Name: "split css/html/ts files", Status: "new"})

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
