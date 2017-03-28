import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {AppComponent }         from './app.component';
import {ActivitiesComponent }      from './component/activities/activities.component';
import {ActivityService} from './service/activity.service';
import {ErrorService} from './service/error.service'
import {ActivityContextMenuService} from './service/activity-contextmenu.service'
import {ErrorsComponent} from './component/errors/errors.component';
import {ActivityContextmenuComponent} from './component/activity-contextmenu/activity-contextmenu.component';
import {TruncatePipe} from './utils/pipes/truncate';
import {ActivityDetailComponent} from './component/activity-detail/activity-detail.component';
import {LogtimeComponent} from './component/timelog/timelog.component'
import {TimelogService} from './service/timelog.service'
import {LogtimeListComponent} from './component/timelog-list/timelog-list.component'
import {DurationPipe} from './utils/pipes/durationPipe'
import {routing} from './app.routes'
import {TimerService} from "./service/timer.service";
import {TimerComponent} from "./component/timer/timer.component"
import { MaterialModule } from '@angular/material';
import {JournalComponent} from './component/journal/journal.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        FlexLayoutModule.forRoot(),
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ActivitiesComponent,
        ErrorsComponent,
        ActivityContextmenuComponent,
        TruncatePipe,
        ActivityDetailComponent,
        LogtimeComponent,
        LogtimeListComponent,
        DurationPipe,
        TimerComponent,
        JournalComponent
    ],
    providers: [
        ActivityService, ErrorService, ActivityContextMenuService, TimelogService, TimerService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
