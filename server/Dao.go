package main

import ("fmt"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var nextId int

var activities Activities

func init () {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT MAX(act_id) FROM activities")
	checkErr(err)

	rows, err := stmt.Query();
	checkErr(err)

	rows.Scan(&nextId)
	nextId++

	stmt, err = db.Prepare("SELECT * FROM activities")
	checkErr(err)

	rows, err = stmt.Query();
	checkErr(err)

	for rows.Next() {
		var act Activity
		var name string
		var status string
		var id int
		err = rows.Scan(&id, &name, &status)
		checkErr(err)
		act = Activity{id, name, status}
		activities = append(activities, act)
	}

	db.Close();
}

func UpdateActivity (act Activity) error {
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


func CreateActivity (a Activity) Activity {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("INSERT INTO activities (act_id, act_name, act_status) values (?,?,?)")
	checkErr(err)

	_ , err = stmt.Exec(nextId,a.Name,a.Status)
	checkErr(err)

	db.Close();

	a.Id=nextId
	activities = append(activities, a)
	nextId += 1
	return a
}




func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

