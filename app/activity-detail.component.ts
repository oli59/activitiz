import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Activity} from './activity';

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

    statuses =['new', 'done', 'cancelled'];


    constructor (
        private activityService: ActivityService
    ) {}

    ngOnInit () {
        if (this.activity == undefined) {
            this.activity = new Activity();
            this.activity.status = 'new';
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
}