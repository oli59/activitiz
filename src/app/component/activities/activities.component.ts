import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {Activity} from '../../domain/activity';
import {ActivityService} from '../../service/activity.service';
import {ErrorService} from '../../service/error.service';
import {ActivityContextMenuService} from '../../service/activity-contextmenu.service'

@Component({
    selector: 'my-activities',
    templateUrl: 'activities.component.html',
    styleUrls:['activities.component.css'],
    host: {class: 'myClass'},
})

export class ActivitiesComponent implements OnInit{
    activities: Activity[];
    selectedActivity: Activity;
    addingActivity: boolean;
    hideDone = true;
    parentActivity: Activity;
    topActivity: Activity = {
        id: 0,
        name: 'Top',
        parent_id: null,
        status: 'new',
        scheduling_mode: 'None',
        typical_duration: 0,
        current_points: 0,
        deadline: null,
        scheduling_period: null,
        scheduling_pace: null,
        scheduling_detail: null
    };
    allParents = [this.topActivity];


    constructor(private activityService: ActivityService, private errorService: ErrorService,
                private activityContextMenuService: ActivityContextMenuService) {}

    onSelect(activity: Activity) {
        this.selectedActivity = activity;
        this.addingActivity = false;
    }

    enterActivity(activity) {
        if (activity != this.parentActivity) {
            this.errorService.reset();
            this.selectedActivity = null;
            this.addingActivity = false;
            this.parentActivity = activity;
            this.getActivities();
            this.getAllParents();
        }
    }

    ngOnInit(){
        this.getActivities();
        this.hideDone = true;
        this.allParents = [this.topActivity];
    }

    contextMenu(event, activity: Activity) {
        this.activityContextMenuService.showMenu(event, activity);
        return false;
    }

    getActivities () {
        this.activityService.getActivitiesByParent(this.parentActivity)
            .then(activities => this.activities = activities)
            /*.catch();*/
    }

    getAllParents() {
        this.activityService.getAllParents(this.parentActivity).then(activities => {
                if (activities != null) {
                    this.allParents = activities;
                    this.allParents.unshift(this.topActivity);
                }
                else {
                    this.allParents = [];
                    this.allParents.unshift(this.topActivity);
                }
            }
        )/*.catch()*/;
    }

    addActivity() {
        this.selectedActivity = null;
        this.addingActivity = true;
    }

    listActivitiesChanged(event) {
        this.addingActivity = false;
        this.selectedActivity = null;
        this.getActivities();
    }

}
