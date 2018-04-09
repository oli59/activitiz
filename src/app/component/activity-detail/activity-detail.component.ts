import {Component, EventEmitter, Input, Output, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {Activity} from '../../domain/activity';
import {activityStatuses} from '../../domain/activity-statuses';
import { ActivityService } from '../../service/activity.service';
import {schedulingModes, schedulingPeriods} from '../../domain/scheduling-modes';
import {selector} from "rxjs/operator/publish";



@Component({
    selector: 'my-activity-detail',
    templateUrl: 'activity-detail.component.html'
})


export class ActivityDetailComponent implements OnInit {
    @Input() activity: Activity;
    @Input() parentActivity;
    @Output() savedNewActivity = new EventEmitter();
    error: any;
    showDeleteConfirmation = false;
    existingActivity;
    statuses = activityStatuses;
    modes = schedulingModes;
    periods = schedulingPeriods;
    days: [{name: string, selected: boolean}];

    constructor (
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
            .then(activity => {
                this.activity=activity;
                this.savedNewActivity.emit({
                    value: activity
                });
            })
            .catch(error => this.error = error)
    }

    deleteConfirmation() {
        this.showDeleteConfirmation = true;
    }

    abortDelete() {
        this.showDeleteConfirmation = false;
    }

    delete() {
        this.activityService
            .delete(this.activity)
            .then(response => {
                this.showDeleteConfirmation = false;
                this.savedNewActivity.emit({
                    value: this.activity
                });
            })
            .catch(error => this.error = error)
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
