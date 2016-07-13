import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {Activity} from './activity';
import {ActivityDetailComponent} from './activity-detail.component';
import {ActivityService} from './activity.service';

@Component({
    selector: 'my-app',
    template: `

    <div id="wrapper">

    <div class="app_title">
    {{title}}
    </div>

    <div class="app_body">

    <div class="nav">
    <div>
        <input type="checkbox" [ngModel]="hideDone" (change)="hide()">
        hide done
    </div>
    Top<br>
    Work<br>
    epay<br>
    </div>

    <div class="canvas">
    <ul class="activities">
        <li *ngFor="let activity of activities" draggable="true" (click)="onSelect(activity)"
            [class.hidden]="hideDone && activity.status != 'new'"
            [class.selected]="activity === selectedActivity"
            [class.done]="activity.status === 'done'"
            [class.cancelled]="activity.status === 'cancelled'">
            {{activity.name}}
        </li>
    </ul>

    <div class="error" *ngIf="error">{{error}}</div>
    <button (click)="addActivity()" class="round-button add-button">+</button>

    <div *ngIf="addingActivity">
        <my-activity-detail (savedNewActivity)="listActivitiesChanged($event);"></my-activity-detail>
    </div>

    <div *ngIf="selectedActivity">
        <my-activity-detail [activity]="selectedActivity"></my-activity-detail>
    </div>

    </div>

    <div class="app_footer">
        OM  2016
    </div>

    </div>

    `,

    styles:[`
        .hidden {
            display: none
        }
        .canvas {
            position: relative;
            border: 1px solid black;
            -webkit-flex: 1;
            flex: 1;
            margin: 0 0.5em 0.5em;
        }
        .nav{
            margin: 0 0 0.5em 0.5em;
            line-height:30px;
            border: 1px solid black;
            background-color:#eeeeee;
            width:100px;
        }
        .activities {
            margin: 0 0 2em 2em;
            position: relative;
            list-style-type: none;
            width: 20em;
        }
        .activities li {
            text-align: center;
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: 0.3em 0;
            height: 4em;
            border-radius: 4px;
        }
        .activities li.done {
            color:#000 !important;
            background-color:#a2cf6f !important
        }
        .activities li.cancelled {
            color:#fff !important;
            background-color:#f6665c !important
        }
        .activities li.selected {
            background-color: #BBD8DC !important;
            color: white;
        }
        .activities li:hover {
            color: #607D8B;
            background-color: #DDD;
            left: .1em;  
        }
        .activities .text {
             position: relative;
             top: -3px;
        }
        .details {
            posititon:relative;
            bottom: -5em;
            width: 100%;
            minimum-height: 50em;
            border: 1px solid black;
        }
        .round-button {
    background-color: #369;
    border: none;
    color:#f5f5f5;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    font-size: 25px;
    margin: 2px 2px;
    cursor: pointer;
    border-radius: 48%;
        }
        .round-button:hover {
            color: #369;
            background-color: #DDD;
        }
        .add-button {
            position:absolute;
            top:20px;
            right:20px;
        }
    `],
    directives: [ActivityDetailComponent],
    providers: [ActivityService],
})

export class AppComponent implements OnInit{
    title = 'Activitiz';
    activities: Activity[];
    selectedActivity: Activity;
    error: any;
    addingActivity;

    hideDone = false;

    constructor(private activityService: ActivityService) {}

    onSelect(activity: Activity) {
        this.selectedActivity = activity;
        this.addingActivity = null;

    }

    ngOnInit(){
        this.getActivities();
    }

    getActivities () {
        this.activityService.getActivities().then(activities => this.activities = activities);
    }

    addActivity() {
        this.addingActivity = true;
        this.selectedActivity = null;
    }

    listActivitiesChanged(event) {
        console.log("received");
        console.log(event);
        this.addingActivity = false;
        this.getActivities();
    }

    hide() {
        this.hideDone = (this.hideDone) ? false : true
    }
}
