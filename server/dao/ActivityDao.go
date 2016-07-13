package dao

import ("log"
	"fmt"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/oli59/activitiz/server/domain"
)

var nextId int

var  activities domain.Activities

func init () {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT MAX(act_id) FROM activities")
	checkErr(err)

	rows, err := stmt.Query()
	checkErr(err)

	rows.Next()
	rows.Scan(&nextId)
	rows.Close()

	nextId += 1

	stmt, err = db.Prepare("SELECT * FROM activities")
	checkErr(err)

	rows, err = stmt.Query()
	checkErr(err)

	for rows.Next() {
		var act domain.Activity
		var name string
		var status string
		var id int
		err = rows.Scan(&id, &name, &status)
		checkErr(err)
		act = domain.Activity{id, name, status}
		activities = append(activities, act)
	}

	db.Close();
}

func UpdateActivity (act domain.Activity) error {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("UPDATE activities SET act_name=?, act_status=? WHERE act_id=?")
	checkErr(err)

	_ , err = stmt.Exec(act.Name,act.Status, act.Id)
	checkErr(err)

	db.Close();

	for i, a := range activities {
		if a.Id == act.Id {
			activities = append(append(activities[:i], act) , activities[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Could not find Activity with id of %d to update", act.Id)


}


func CreateActivity (a domain.Activity) domain.Activity {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("INSERT INTO activities (act_id, act_name, act_status) values (?,?,?)")
	checkErr(err)

	log.Print(nextId)

	_ , err = stmt.Exec(nextId,a.Name,a.Status)
	checkErr(err)

	db.Close();

	a.Id=nextId
	activities = append(activities, a)
	nextId += 1
	return a
}

func GetActivities () domain.Activities {
	return activities;
}


func GetActivitiesByParent (actId int) domain.Activities {
	return activities;
}



func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}