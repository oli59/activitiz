import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `


    <div class="app_title">
    {{title}}
    </div>

    <div class="app-body">

    <div class="nav">
    Top<br>
    Work<br>
    epay<br>
    </div>

    <div class="canvas">
    <ul class="activities">
        <li *ngFor="let activity of activities" draggable="true" (click)="onSelect(activity)"
            [class.selected]="activity === selectedActivity"
            [class.done]="activity.status === 'done'">
            <span class="badge">{{activity.status}}</span> {{activity.name}}
        </li>
    </ul>
    </div>

    <div *ngIf="selectedActivity" class="details">

    <h2>{{selectedActivity.name}} details!</h2>
    <div>
        <label>name: </label>
        <input [(ngModel)]="selectedActivity.name" placeholder="name">
    </div>
    <div><label>status: </label> {{selectedActivity.status}}</div>
    </div>

    </div>

    <div class="app_footer">
        OM  2016
    </div>

    `,

    styles:[`
        .canvas {
            border: 1px solid black;
            width: 100%;
        }
        .nav{
            float: left;
            line-height:30px;
            border: 1px solid black;
            background-color:#eeeeee;
            width:100px;
            height: 100%;
        }
        .activities {
            margin: 0 0 2em 110px;
            position: relative;
            list-style-type: none;
            width: 20em;
        }
        .activities li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: .3em 0;
            height: 4em;
            border-radius: 4px;
        }
        .activities li.done {
            background-color: green;
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
        .activities .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.8em 0.7em 0 0.7em;
            background-color: #607D8B;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 4.7em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }
        .details {
            width: 100%;
            minimum-height: 50em;
            border: 1px solid black;
        }
    `]
})

export class AppComponent {
    title = 'Activitiz'
    public activities = ACTIVITIES;

    selectedActivity: Activity;

    onSelect(activity: Activity) {this.selectedActivity = activity}
}

export class Activity {
    id: number;
    name: string;
    status: string;
}

var ACTIVITIES: Activity[] = [
    {"id": 1, "name" : "Work", "status" : "new"},
    {"id": 2, "name" : "Maison", "status" : "done"},
    {"id": 3, "name" : "Todo", "status" : "cancelled"},
    {"id": 4, "name" : "Menage", "status" : "new"},
    {"id": 5, "name" : "Sport", "status" : "new"},
];
