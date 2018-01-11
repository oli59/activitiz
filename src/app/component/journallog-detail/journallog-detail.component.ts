import { Component }       from '@angular/core';
import {MatDialogRef} from'@angular/material';
import 'rxjs/add/operator/startWith';
import { FormControl} from '@angular/forms';
import {Activity} from '../../domain/activity';
import {ActivityService} from '../../service/activity.service';
import {Journallog} from '../../domain/journallog'


@Component({selector: 'my-journallog-detail',
  templateUrl: './journallog-detail.component.html'
})


export class JournalLogDetailComponent {
  logDate: Date = new Date;
  logType: string;
  activityCtrl: FormControl;
  filteredActivities: any;
  activities: Activity[];
  selectedActivity: Activity;

  constructor(public dialogRef: MatDialogRef<any>, private activityService: ActivityService) {
    this.logType = "activity";
    this.activityCtrl = new FormControl();

    activityService.getAllLeafActivities()
      .then(activities => {this.activities = activities});

    this.filteredActivities = this.activityCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterActivities(name));
  }

  filterActivities(val: string) {
    return val? this.activities.filter(s => new RegExp(`^${val}`, 'gi').test(s.name))
      : this.activities;
  }

  displayFn(value: any): string {

    return value && typeof value === 'object' ? value.name : value;
  }

  createJournalLog() {
    if (this.selectedActivity) {
      var journalLog : Journallog = new Journallog;
      journalLog.activity_id = this.selectedActivity.id;
      journalLog.date = this.logDate;
      journalLog.name = this.selectedActivity.name;
      journalLog.status = 'open';
      this.dialogRef.close(journalLog);
    }
  }

  selected(activity) {
    this.selectedActivity = activity;

  }

}
