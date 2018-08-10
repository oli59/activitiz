import {Component, EventEmitter, Input, Output, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {Activity} from '../../domain/activity';
import {activityStatuses} from '../../domain/activity-statuses';
import { ActivityService } from '../../service/activity.service';
import {schedulingModes, schedulingPeriods} from '../../domain/scheduling-modes';
import {MatDialog, MatDialogRef} from "@angular/material";



@Component({
    selector: 'my-activity-detail',
    templateUrl: 'activity-detail.component.html'
})


export class ActivityDetailComponent implements OnInit {
    @Input() activity: Activity;
    @Input() parentActivity;
    @Output() savedNewActivity = new EventEmitter();
    error: any;
    existingActivity;
    statuses = activityStatuses;
    modes = schedulingModes;
    periods = schedulingPeriods;
    days;

    constructor (
        public dialog: MatDialog,
        private activityService: ActivityService
    ) {}

    ngOnInit () {
        if (this.parentActivity != null) {
            this.activity.parent_id = this.parentActivity.id;
        }
    }

  ngOnChanges(changes: SimpleChanges) {
    if (this.activity == undefined) {
      this.activity = new Activity();
      this.activity.status = 'new';
      this.existingActivity = false;
      this.initDays();
    }
    else {
      this.existingActivity = true;
      if (this.activity.scheduling_period == "Week") {
        this.initDaysFromActivity();
      }
      else {
        this.initDays()
      }
    }
  }

    onChangeStatus(newStatus) {
        this.activity.status = newStatus;
    }

    save() {
        if (this.activity.scheduling_period == 'Week') {
          this.mapDaysToActivityList();
        }
        this.activityService
            .save(this.activity)
            .subscribe((activity: Activity) => {
                this.activity=activity;
                this.savedNewActivity.emit({
                    value: activity
                });
            })
    }

    openDeleteConfirmation() {
       const dialogRef = this.dialog.open(DeleteConfirmationDialog);
       dialogRef.afterClosed().subscribe(result => {
         if (result == true) {
           this.delete();
         }
       });
    }

    delete() {
        this.activityService
            .delete(this.activity)
            .subscribe(response => {
                this.savedNewActivity.emit({
                    value: this.activity
                });
            })
    }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  initDays() {
    this.days = [{name: "Monday", selected: false},
      {name: "Tuesday", selected: false},
      {name: "Wednesday", selected: false},
      {name: "Thursday", selected: false},
      {name: "Friday", selected: false},
      {name: "Saturday", selected: false},
      {name: "Sunday", selected: false}
    ]
  }

  initDaysFromActivity() {

    this.days = [{name: "Monday", selected: this.activity.scheduling_detail.charAt(0) == '1' },
      {name: "Tuesday", selected: this.activity.scheduling_detail.charAt(1) == '1' },
      {name: "Wednesday", selected: this.activity.scheduling_detail.charAt(2) == '1' },
      {name: "Thursday", selected: this.activity.scheduling_detail.charAt(3) == '1' },
      {name: "Friday", selected: this.activity.scheduling_detail.charAt(4) == '1' },
      {name: "Saturday", selected: this.activity.scheduling_detail.charAt(5) == '1' },
      {name: "Sunday", selected: this.activity.scheduling_detail.charAt(6) == '1' }
    ]
  }

  mapDaysToActivityList() {
    let i = 0;
    this.activity.scheduling_detail = "";
    for(i = 0; i < this.days.length; i++ ) {
      if (this.days[i].selected)
        this.activity.scheduling_detail += '1'
      else
        this.activity.scheduling_detail += '0'
    }
  }
}


@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete-confirmation-dialog.component.html',
})
export class DeleteConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}



