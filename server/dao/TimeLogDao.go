package dao

import ("log"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/oli59/activitiz/server/domain"
	"time"
)

var tlNextId int

func init () {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT MAX(tl_id) FROM timelog")
	checkErr(err)

	rows, err := stmt.Query()
	checkErr(err)

	rows.Next()
	rows.Scan(&tlNextId)
	rows.Close()

	tlNextId += 1

	db.Close();
}


func GetTimeLogs () domain.TimeLogs {
	var timeLogs domain.TimeLogs;

	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT * FROM timelog ORDER BY tl_date DESC")
	checkErr(err)

	rows, err := stmt.Query()
	checkErr(err)

	for rows.Next() {
		var tl domain.TimeLog
		var id int
		var dateStr string
		var startHourStr string
		var endHourStr string
		var durationStr string
		var activityId domain.JsonNullInt64
		var comment string


		err = rows.Scan(&id, &dateStr, &startHourStr, &endHourStr, &durationStr, &activityId, &comment)
		checkErr(err)

		date, err := time.Parse("20060102", dateStr);
		checkErr(err)
		startHour, err := time.Parse("20060102", startHourStr);
		checkErr(err)
        endHour, err := time.Parse("20060102", endHourStr);
        checkErr(err)
        duration, err := time.ParseDuration(durationStr);
        checkErr(err)

		tl = domain.TimeLog{id, date, startHour, endHour, duration, activityId, comment}
		timeLogs = append(timeLogs, tl)
	}

	return timeLogs;
}



func CreateTimeLog (tl domain.TimeLog) domain.TimeLog {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("INSERT INTO timelog (tl_id, tl_date, tl_startHour, tl_endHour, tl_duration, tl_act_id, tl_comment) values (?,?,?,?,?,?,?)")
	checkErr(err)

	log.Print(nextId)

	_ , err = stmt.Exec(tlNextId, tl.Date, tl.StartHour, tl.EndHour, tl.Duration, tl.ActivityId, tl.Comment)
	checkErr(err)

	db.Close();

	tl.Id=tlNextId
	tlNextId += 1
	return tl
}