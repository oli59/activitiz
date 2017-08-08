import { Component }       from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<div id="wrapper">
    
    <nav class="navbar navbar-default navbar-custom">
        <div class="container-fluid">
            <div class="navbar-header">
                <p class="navbar-brand-custom">{{title}}</p>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="#" routerLink="/activities" routerLinkActive="active">Activities</a></li>
                <li><a href="#" routerLink="/timelogs" routerLinkActive="active">Time Log</a></li> 
                <li><a href="#">Stats</a></li>
                <li><a href="#" routerLink="/journal" routerLinkActive="active">Journal</a></li>
            </ul>
            <timer></timer>
        </div>
    </nav>
   
    <my-errors></my-errors>
    
    <activity-contextmenu></activity-contextmenu>
    <journallog-contextmenu></journallog-contextmenu>

    <router-outlet class="app_body"></router-outlet>
    
    <div class="app_footer">
        OM  2016
    </div>

    </div>

    `
})

export class AppComponent {
    title = 'Activitiz';
    error: any;
}
