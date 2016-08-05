import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {Activity} from './activity';
import {ActivityDetailComponent} from './activity-detail.component';
import {ActivityService} from './activity.service';
import {TruncatePipe} from './truncate';

@Component({
    selector: 'my-activities',
    pipes: [TruncatePipe],
    templateUrl: 'app/activities.component.html',
    styleUrls:['app/activities.component.css'],
    directives: [ActivityDetailComponent],
})

export class ActivitiesComponent implements OnInit{
    activities: Activity[];
    selectedActivity: Activity;
    addingActivity: boolean;
    hideDone = true;
    parentActivity: Activity;
    allParents: Activity[] = [];

    topActivity: Activity = {
        id: 0,
        name: 'Top',
        parent_id: null,
        status: 'new'
    };

    constructor(private activityService: ActivityService) {}

    onSelect(activity: Activity) {
        this.selectedActivity = activity;
        this.addingActivity = null;
    }

    enterActivity(activity) {
        if (activity != this.parentActivity) {
            this.selectedActivity = null;
            this.addingActivity = null;
            this.parentActivity = activity;
            this.getActivities();
            this.getAllParents();
        }
    }

    ngOnInit(){
        this.getActivities();
    }

    getActivities () {
        this.activityService.getActivities(this.parentActivity).then(activities => this.activities = activities);
    }
    
    getAllParents() {
        this.activityService.getAllParents(this.parentActivity).then(activities => {
                if (activities != null) {
                    this.allParents = activities;
                    this.allParents.unshift(this.topActivity);
                }
                else
                    this.allParents = [];
            }
        );
    }

    addActivity() {
        this.addingActivity = true;
        this.selectedActivity = null;
    }

    listActivitiesChanged(event) {
        this.addingActivity = false;
        this.getActivities();
    }

    hide() {
        this.hideDone = (this.hideDone) ? false : true
    }
}
