import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ActivityService} from './activity.service';
import {ErrorsComponent} from './errors.component'
import {ErrorService} from './error.service'
import {ActivityContextMenuService} from './activity-contextmenu.service'
import {ActivityContextmenuComponent} from './activity-contextmenu.component'

@Component({
    selector: 'my-app',
    template: `<div id="wrapper">

    <div class="app_title">
    {{title}}
    </div>
    
    <a [routerLink]="['/activities']">Activities</a>
    
    <my-errors></my-errors>
    
    <activity-contextmenu></activity-contextmenu>
    
    <router-outlet class="app_body"></router-outlet>

    <div class="app_footer">
        OM  2016
    </div>

    </div>

    `,
    directives: [ROUTER_DIRECTIVES, ErrorsComponent, ActivityContextmenuComponent],
    providers: [ActivityService, ErrorService, ActivityContextMenuService]
})

export class AppComponent {
    title = 'Activitiz';
    error: any;
}