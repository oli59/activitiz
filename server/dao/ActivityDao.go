package dao

import ("log"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/oli59/activitiz/server/domain"
	"fmt"
  "time"
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
  var deadline sql.NullString;

	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("UPDATE activities SET act_name=?, act_parent_id = ?, act_status=?, act_scheduling_mode=?, act_typical_duration=?, act_current_points=?, act_deadline=?, act_scheduling_period=?, act_scheduling_pace=?, act_scheduling_detail=?  WHERE act_id=?")
	checkErr(err)

  if (act.Deadline != nil) {
    deadline.String = act.Deadline.Format("20060102")
    deadline.Valid = true
  } else {
    deadline.Valid = false
  }

  _ , err = stmt.Exec(act.Name, act.ParentId, act.Status, act.SchedulingMode, act.TypicalDuration, act.CurrentPoints, deadline, act.SchedulingPeriod, act.SchedulingPace, act.SchedulingDetail, act.Id)
	checkErr(err)

	db.Close();

	return nil;
}

func DeleteActivity (activityId int) error {
	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("DELETE FROM activities WHERE act_id=?")
	checkErr(err)

	_ , err = stmt.Exec(activityId)
	checkErr(err)

	db.Close();

	return nil;
}


func CreateActivity (a domain.Activity) domain.Activity {
  var deadline sql.NullString;

  db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	fmt.Println(a.ParentId)

	stmt, err := db.Prepare("INSERT INTO activities (act_id, act_parent_id, act_name, act_status, act_scheduling_mode, act_typical_duration, act_current_points, act_deadline, act_scheduling_period, act_scheduling_pace, act_scheduling_detail) values (?,?,?,?,?,?,?,?,?,?,?)")
	checkErr(err)

	log.Print(nextId)

  if (a.Deadline != nil) {
    deadline.String = a.Deadline.Format("20060102")
    deadline.Valid = true
  } else {
    deadline.Valid = false
  }

	_ , err = stmt.Exec(nextId, a.ParentId, a.Name,a.Status, a.SchedulingMode, a.TypicalDuration, a.CurrentPoints, deadline, a.SchedulingPeriod, a.SchedulingPace, a.SchedulingDetail)
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
    act := ScanOneActivity(rows);
		activities = append(activities, act)
	}

  db.Close();

	return activities;
}

/*get all activities without child*/
func GetAllLeafs () domain.Activities {
  var activities domain.Activities;

  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("SELECT * FROM activities WHERE act_status = 'new' AND act_id in (SELECT apc_child_id FROM activities_parent_closure WHERE apc_child_id not in (SELECT apc_parent_id FROM activities_parent_closure WHERE apc_parent_id <> apc_child_id))")
  checkErr(err)

  rows, err := stmt.Query()
  checkErr(err)

  for rows.Next() {
    act := ScanOneActivity(rows);
    activities = append(activities, act)
  }

  db.Close();

  return activities;
}


/*get all schedulable activities without child*/
func GetAllSchedulableLeafs () domain.Activities {
  var activities domain.Activities;

  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("SELECT * FROM activities WHERE act_status = 'new' AND act_scheduling_mode = 'Automatic' AND act_id in (SELECT apc_child_id FROM activities_parent_closure WHERE apc_child_id not in (SELECT apc_parent_id FROM activities_parent_closure WHERE apc_parent_id <> apc_child_id))")
  checkErr(err)

  rows, err := stmt.Query()
  checkErr(err)

  for rows.Next() {
    act := ScanOneActivity(rows);
    activities = append(activities, act)
  }

  db.Close();

  return activities;
}

/*get all leafs that are still active and have a deadline*/
func GetAllSchedulableByDeadLine () domain.Activities {
  var activities domain.Activities;

  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("SELECT * FROM activities WHERE act_status = 'new' AND act_deadline is not null AND act_id in (SELECT apc_child_id FROM activities_parent_closure WHERE apc_child_id not in (SELECT apc_parent_id FROM activities_parent_closure WHERE apc_parent_id <> apc_child_id)) order by act_deadline")
  checkErr(err)

  rows, err := stmt.Query()
  checkErr(err)

  for rows.Next() {
    act := ScanOneActivity(rows);
    activities = append(activities, act)
  }

  db.Close();

  return activities;
}


/*get all leafs that are still active and are scheduled by Frenquency*/
func GetAllSchedulableByFrequency () domain.Activities {
  var activities domain.Activities;

  db, err := sql.Open("sqlite3", "./activity.db")
  checkErr(err)

  stmt, err := db.Prepare("SELECT * FROM activities WHERE act_status = 'new' AND act_scheduling_mode like 'Recurrent' AND act_id in (SELECT apc_child_id FROM activities_parent_closure WHERE apc_child_id not in (SELECT apc_parent_id FROM activities_parent_closure WHERE apc_parent_id <> apc_child_id)) order by act_deadline")
  checkErr(err)

  rows, err := stmt.Query()
  checkErr(err)

  for rows.Next() {
    act := ScanOneActivity(rows);
    activities = append(activities, act)
  }

  db.Close();

  return activities;
}

/*return the activity with the given id*/
func GetActivity (actId int) domain.Activity {
	var activity domain.Activity;
	var rows *sql.Rows;

	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT * FROM activities WHERE act_id =?")
	checkErr(err)

	rows, err = stmt.Query(actId);
	checkErr(err)

	for rows.Next() {
    activity = ScanOneActivity(rows);
	}

	db.Close();

	return activity;
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
    act := ScanOneActivity(rows);    activities = append(activities, act)
	}

	db.Close();

	return activities;
}


func GetAllParents (actId int) domain.Activities {
	var activities domain.Activities;

	db, err := sql.Open("sqlite3", "./activity.db")
	checkErr(err)

	stmt, err := db.Prepare("SELECT activities.* FROM activities_parent_closure INNER JOIN activities ON activities.act_id = activities_parent_closure.apc_parent_id WHERE apc_child_id = ? ORDER BY apc_depth DESC;")
	checkErr(err)

	rows, err := stmt.Query(actId);
	checkErr(err)

	for rows.Next() {
    act := ScanOneActivity(rows);
    activities = append(activities, act)
	}

	fmt.Println(activities);

	db.Close();

	return activities;

}

/*Scan one activity*/
func ScanOneActivity(rows *sql.Rows) domain.Activity{

  var act domain.Activity
  var name string
  var status string
  var id int
  var parentId domain.JsonNullInt64
  var schedulingMode sql.NullString
  var typicalDuration domain.JsonNullInt64
  var currentPoints domain.JsonNullInt64
  var deadlinestr sql.NullString
  var frequency sql.NullString
  var period sql.NullString
  var pace domain.JsonNullInt64
  var schedulingDetail sql.NullString

  err := rows.Scan(&id, &parentId, &name, &status, &schedulingMode, &typicalDuration, &currentPoints, &deadlinestr, &frequency, &period, &pace, &schedulingDetail);
  checkErr(err)

  var deadlinePtr *time.Time
  if deadlinestr.Valid {
    deadline, err := time.Parse("20060102", deadlinestr.String);
    checkErr(err)
    deadlinePtr = &deadline;
  } else {
    deadlinePtr = nil
  }

  act = domain.Activity{id, parentId, name, status, schedulingMode.String, typicalDuration, currentPoints, deadlinePtr, period.String, pace, schedulingDetail.String}

  return act;
}
