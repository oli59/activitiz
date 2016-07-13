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
    <div>
        <label>status: </label>
        <select (change)="onChangeStatus($event.target.value)">
            <option *ngFor="let status of statuses">{{status}}</option>         
        </select>
    </div>
    <button (click)="save()">Save</button>
    </div>
`
})


export class ActivityDetailComponent implements OnInit {
    @Input() activity: Activity;
    @Output() savedNewActivity = new EventEmitter();
    error: any;

    statuses =['new', 'done', 'cancelled'];


    constructor (
        private activityService: ActivityService
    ) {}

    ngOnInit () {
        if (this.activity == undefined)
            this.activity = new Activity();
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
                    value: "yeash"
                });
            })
            .catch(error => this.error = error)
    }
}