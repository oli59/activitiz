import {Component, Input} from '@angular/core';
import {Activity} from './activity';

@Component({
    selector: 'my-activity-detail',
    template:    `<div *ngIf="activity" class="details">

        <h2>{{activity.name}} details!</h2>
        <div>
            <label>name: </label>
            <input [(ngModel)]="activity.name" placeholder="name">
        </div>
    <div><label>status: </label> {{activity.status}}</div>
</div>`
})

export class ActivityDetailComponent{
    @Input()
    activity: Activity;
}