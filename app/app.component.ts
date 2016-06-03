import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
    <h2>{{activity.name}} details!<h2>
    <div>
        <label>name: </label> 
        <input [(ngModel)]="activity.name" placeholder="name"> 
    </div>
    <div><label>status: </label> {{activity.status}}</div>`
})

export class AppComponent {
    title = 'Activitiz'
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

