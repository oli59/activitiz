package main

import ("fmt"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var activities Activities

var db (*sql.DB)

func init () {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT * FROM activities")
	checkErr(err)

	rows, err := stmt.Query();
	checkErr(err)

	for rows.Next() {
		var act Activity
		var name string
		var status string
		var id int
		err = rows.Scan(&id, &name, &status)
		fmt.Println(id)
		fmt.Println(name)
		fmt.Println(status)
		checkErr(err)
		act = Activity{id, name, status}
		activities = append(activities, act)
	}

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}