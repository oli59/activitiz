import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ActivityService} from './activity.service'

@Component({
    selector: 'my-app',
    template: `<div id="wrapper">

    <div class="app_title">
    {{title}}
    </div>
    
    <div class="error" *ngIf="error">{{error}}</div>
    
    <a [routerLink]="['/activities']">Activities</a>
    
    <router-outlet class="app_body"></router-outlet>

    <div class="app_footer">
        OM  2016
    </div>

    </div>

    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ActivityService]
})

export class AppComponent {
    title = 'Activitiz';
    error: any;
}