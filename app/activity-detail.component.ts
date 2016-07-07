import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Activity} from './activity';

import { ActivityService } from './activity.service';


@Component({
    selector: 'my-activity-detail',
    template:    `<div class="details">

        <h2>{{activity.name}} details!</h2>
        <div>
            <label>name: </label>
            <input [(ngModel)]="activity.name" placeholder="name">
        </div>
    <div><label>status: </label> {{activity.status}}</div>
    <button (click)="save()">Save</button>
    </div>
`
})


export class ActivityDetailComponent implements OnInit {
    @Input() activity: Activity;
    @Output() savedNewActivity = new EventEmitter();
    error: any;

    constructor (
        private activityService: ActivityService
    ) {}

    ngOnInit () {
        if (this.activity == undefined)
            this.activity = new Activity();
    }

    save() {
        this.activityService
            .save(this.activity)
            .then(activity => {
                this.activity=activity;
                this.savedNewActivity.emit({
                    value: "yeash"
                });
            })
            .catch(error => this.error = error)
    }
}