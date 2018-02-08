package dao

import (
  "github.com/oli59/activitiz/server/domain"

  "database/sql"
  "time"
  "net/url"
  "strconv"
)

var jlNextId int

func init () {
  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("SELECT MAX(jl_id) FROM journallog")
  checkErr(err)

  rows, err := stmt.Query()
  checkErr(err)

  rows.Next()
  rows.Scan(&jlNextId)
  rows.Close()

  jlNextId += 1

  db.Close();
}



func CreateJournallog (jl domain.Journallog) domain.Journallog {

db, err := sql.Open("sqlite3", "./activity.db")
checkErr(err)

stmt, err := db.Prepare("INSERT INTO journallog (jl_id, jl_date, jl_status, jl_act_id, jl_timelog_id, jl_name) values (?,?,?,?,?,?)")
checkErr(err)

_ , err = stmt.Exec(jlNextId, jl.Date.Format("20060102"), jl.Status, jl.ActivityId, jl.TimeLogId, jl.Name)
checkErr(err)

db.Close();

jl.Id=jlNextId
  jlNextId += 1

  return jl
}

func GetJournallogForDate (date time.Time) domain.Journallogs {
  var rows *sql.Rows;
  var journallogs domain.Journallogs

  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("SELECT * FROM journallog WHERE jl_date =?")
  checkErr(err)

  rows, err = stmt.Query(date.Format("20060102"));
  checkErr(err)

  for rows.Next() {
    var journallog domain.Journallog
    var id int
    var dateStr string
    var status string
    var activityId domain.JsonNullInt64
    var timelogId domain.JsonNullInt64
    var name string
    var hours string

    err = rows.Scan(&id, &dateStr, &status, &activityId, &timelogId, &name)
    checkErr(err)

    date, err := time.Parse("20060102", dateStr);
    checkErr(err)

    hours = "-";

    if timelogId.Valid {
      v := url.Values{}
      v.Set("id", strconv.FormatInt(timelogId.Int64,10))
      timeLogs := GetTimeLogs(v)
      hours = formatHours(timeLogs[0])
    }

    journallog = domain.Journallog{id, date, status, activityId, timelogId, name, hours}
    journallogs = append(journallogs, journallog)

  }

  db.Close();
  return journallogs
}


  func GetJournallogForNextDate (date time.Time) domain.Journallogs {
    var rows *sql.Rows;
    var tempDate time.Time;

    db, err := sql.Open("sqlite3", "./activity.db")
    checkErr(err)

    stmt, err := db.Prepare("SELECT jl_date FROM journallog WHERE jl_date < ? ORDER BY jl_date DESC LIMIT 1")
    checkErr(err)

    rows, err = stmt.Query(date.Format("20060102"));
    checkErr(err)

    tempDate = date.AddDate(0,0,-1);

    if rows.Next() {
      var dateStr string;
      err = rows.Scan(&dateStr)
      checkErr(err)

      tempDate, err = time.Parse("20060102", dateStr);
      checkErr(err)
    }

    rows.Close();

    db.Close();

    return GetJournallogForDate(tempDate)
}

func UpdateJournallog (jl domain.Journallog) error {
  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("UPDATE journallog SET jl_date = ?, jl_status = ?, jl_act_id=?, jl_timelog_id= ?, jl_name= ? WHERE jl_id=?")
  checkErr(err)

  _ , err = stmt.Exec(jl.Date.Format("20060102"), jl.Status, jl.ActivityId, jl.TimeLogId, jl.Name, jl.Id)
  checkErr(err)

  db.Close();

  return nil;
}

func formatHours(tl domain.TimeLog) string {
  return tl.StartHour.Format("15:04") + " - " + tl.EndHour.Format("15:04");
}
