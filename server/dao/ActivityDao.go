package dao

import ("log"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/oli59/activitiz/server/domain"
)

var nextId int

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

	db.Close();
}

func UpdateActivity (act domain.Activity) error {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("UPDATE activities SET act_name=?, act_parent_id = ?, act_status=? WHERE act_id=?")
	checkErr(err)

	_ , err = stmt.Exec(act.Name, act.ParentId, act.Status, act.Id)
	checkErr(err)

	db.Close();

	return nil;
}


func CreateActivity (a domain.Activity) domain.Activity {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("INSERT INTO activities (act_id, act_parent_id, act_name, act_status) values (?,?,?,?)")
	checkErr(err)

	log.Print(nextId)

	_ , err = stmt.Exec(nextId, a.ParentId, a.Name,a.Status)
	checkErr(err)

	db.Close();

	a.Id=nextId
	nextId += 1
	return a
}

func GetActivities () domain.Activities {
	var activities domain.Activities;

	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT * FROM activities")
	checkErr(err)

	rows, err := stmt.Query()
	checkErr(err)

	for rows.Next() {
		var act domain.Activity
		var name string
		var status string
		var id int
		var parentId domain.JsonNullInt64
		err = rows.Scan(&id, &parentId, &name, &status)
		checkErr(err)
		act = domain.Activity{id, parentId, name, status}
		activities = append(activities, act)
	}

	return activities;
}


func GetActivitiesByParent (actId int) domain.Activities {
	var activities domain.Activities;
	var rows *sql.Rows;

	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)


	if actId == 0 {
		stmt, err := db.Prepare("SELECT * FROM activities WHERE act_parent_id is null")
		checkErr(err)

		rows, err = stmt.Query();
		checkErr(err)
	} else {
		stmt, err := db.Prepare("SELECT * FROM activities WHERE act_parent_id =?")
		checkErr(err)

		rows, err = stmt.Query(actId);
		checkErr(err)
	}

	for rows.Next() {
		var act domain.Activity
		var name string
		var status string
		var id int
		var parentId domain.JsonNullInt64
		err = rows.Scan(&id, &parentId, &name, &status)
		checkErr(err)
		act = domain.Activity{id, parentId, name, status}
		activities = append(activities, act)
	}

	db.Close();

	return activities;
}



func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}