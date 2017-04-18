import { Component }       from '@angular/core';
import {MdDialogRef} from'@angular/material';
import 'rxjs/add/operator/startWith';
import { FormControl} from '@angular/forms';
import {Activity} from '../../domain/activity';
import {ActivityService} from '../../service/activity.service';


@Component({selector: 'my-journallog-detail',
  templateUrl: './journallog-detail.component.html'
})


export class JournalLogDetailComponent {
  logType: string;
  activityCtrl: FormControl;
  filteredActivities: any;
  activities: Activity[];
  selectedActivity: Activity;

  constructor(public dialogRef: MdDialogRef<any>, private activityService: ActivityService) {
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
    console.log();
    if (this.selectedActivity) {
      this.dialogRef.close(this.selectedActivity);
    }
  }

}
