package dao

import ("database/sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/oli59/activitiz/server/domain"
	"time"
  "net/url"
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


func GetTimeLogs (inParams url.Values) domain.TimeLogs {
	var timeLogs domain.TimeLogs;
	var activityIdMap map[domain.JsonNullInt64] string;
  params := [] interface{} {};
  var rows *sql.Rows;

  db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

  whereClause := "";
  query := "SELECT * FROM timelog ";

  if value, ok := inParams["id"]; ok {
    whereClause = AddToWhereClause(whereClause, "tl_id = ? ")
    params = append(params, value[0]);
  }



  query = query + whereClause + "ORDER BY tl_date DESC, tl_startHour DESC"

	stmt, err := db.Prepare(query)
	checkErr(err)

  if len(params) > 0 {
	  rows, err = stmt.Query(params...)
    checkErr(err)
  } else {
    rows, err = stmt.Query()
    checkErr(err)
  }

	checkErr(err)

	for rows.Next() {
		var tl domain.TimeLog
		var id int
		var dateStr string
		var startHourStr string
		var endHourStr string
		var duration float64
		var activityId domain.JsonNullInt64
		var comment string


		err = rows.Scan(&id, &dateStr, &startHourStr, &endHourStr, &duration, &activityId, &comment)
		checkErr(err)

		date, err := time.Parse("20060102", dateStr);
		checkErr(err)
		startHourTime, err := time.Parse("1504", startHourStr);
		startHour := domain.HourMinute{startHourTime};

		checkErr(err)
        	endHourTime, err := time.Parse("1504", endHourStr);
		endHour := domain.HourMinute{endHourTime};
       	 	checkErr(err)

		tl = domain.TimeLog{id, date, startHour, endHour, duration, activityId, comment, ""}
		timeLogs = append(timeLogs, tl)

    db.Close();

	}

	activityIdMap = make(map[domain.JsonNullInt64] string)

	for i,tl := range timeLogs {
		name, ok := activityIdMap[tl.ActivityId];
		if !ok {
			act := GetActivity(int(tl.ActivityId.Int64));
			timeLogs[i].Name = act.Name;
			activityIdMap[tl.ActivityId] = act.Name;
		} else {
			timeLogs[i].Name = name;
		}

	}

  db.Close();

	return timeLogs;
}



func CreateTimeLog (tl domain.TimeLog) domain.TimeLog {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("INSERT INTO timelog (tl_id, tl_date, tl_startHour, tl_endHour, tl_duration, tl_act_id, tl_comment) values (?,?,?,?,?,?,?)")
	checkErr(err)

	_ , err = stmt.Exec(tlNextId, tl.Date.Format("20060102"), tl.StartHour.Time.Format("1504"), tl.EndHour.Time.Format("1504"), tl.Duration, tl.ActivityId, tl.Comment)
	checkErr(err)

	db.Close();

	tl.Id=tlNextId
	tlNextId += 1
	return tl
}
