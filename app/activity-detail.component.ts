import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Activity} from './activity';
import {activityStatuses} from './activity-statuses';
import { ActivityService } from './activity.service';



@Component({
    selector: 'my-activity-detail',
    templateUrl: 'app/activity-detail.component.html'
})


export class ActivityDetailComponent implements OnInit {
    @Input() activity: Activity;
    @Input() parentActivity;
    @Output() savedNewActivity = new EventEmitter();
    error: any;
    showDeleteConfirmation = false;
    existingActivity;
    statuses = activityStatuses;

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
}