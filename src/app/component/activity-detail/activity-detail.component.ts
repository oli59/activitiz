import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Activity} from '../../domain/activity';
import {activityStatuses} from '../../domain/activity-statuses';
import { ActivityService } from '../../service/activity.service';
import {schedulingModes} from '../../domain/scheduling-modes';



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

    constructor (
        private activityService: ActivityService
    ) {}

    ngOnInit () {
        if (this.activity == undefined) {
            this.activity = new Activity();
            this.activity.status = 'new';
            this.existingActivity = false;
        }
        else {
            this.existingActivity = true;
        }
        if (this.parentActivity != null) {
            this.activity.parent_id = this.parentActivity.id;
        }
    }

    onChangeStatus(newStatus) {
        this.activity.status = newStatus;
    }

    save() {
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
}
