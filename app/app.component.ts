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
    
    <nav class="navbar navbar-default navbar-custom">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand navbar-brand-custom" href="#">{{title}}</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="#" [routerLink]="['/activities']">Activities</a></li>
                <li><a href="#">Page 2</a></li> 
            </ul>
        </div>
    </nav>
        
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