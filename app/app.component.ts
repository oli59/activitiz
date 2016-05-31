import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
    <h2>{{activity.name}} details!</h2>
    <ul class="activities">
        <li *ngFor="let activity of activities">
            <span class="badge">{{activity.status}}</span> {{activity.name}}
            
        </li>
    </ul>
    <div>
        <label>name: </label> 
        <input [(ngModel)]="activity.name" placeholder="name"> 
    </div>
    <div><label>status: </label> {{activity.status}}</div>`,
    styles:[`
        .activities {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
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
        .activities li:hoover {
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
            height: 4.2em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }
    `]
})

export class AppComponent {
    title = 'Activitiz'
    public activities = ACTIVITIES;

    activity: Activity = {
        id: 1,
        name: 'Working',
        status: 'new'
    }
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
