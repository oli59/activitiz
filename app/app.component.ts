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
    Top<br>
    Work<br>
    epay<br>
    </div>

    <div class="canvas">
    <ul class="activities">
        <li *ngFor="let activity of activities" draggable="true" (click)="onSelect(activity)"
            [class.selected]="activity === selectedActivity"
            [class.done]="activity.status === 'done'"
            [class.cancelled]="activity.status === 'cancelled'">
            {{activity.name}}
        </li>
    </ul>


    <my-activity-detail [activity]="selectedActivity"></my-activity-detail>
    </div>

    </div>

    <div class="app_footer">
        OM  2016
    </div>

    </div>

    `,

    styles:[`
        .canvas {
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
    `],
    directives: [ActivityDetailComponent],
    providers: [ActivityService],
})

export class AppComponent implements OnInit{
    title = 'Activitiz';
    activities: Activity[];
    selectedActivity: Activity;

    constructor(private activityService: ActivityService) {}

    onSelect(activity: Activity) {this.selectedActivity = activity}

    ngOnInit(){
        this.getActivities();
    }

    getActivities () {
        this.activityService.getActivities().then(activities => this.activities = activities);
    }
}


