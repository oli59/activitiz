import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {AppComponent }         from './app.component';
import {ActivitiesComponent }      from './activities.component';
import {ActivityService} from './activity.service';
import {ErrorService} from './error.service'
import {ActivityContextMenuService} from './activity-contextmenu.service'
import {ErrorsComponent} from './errors.component';
import {ActivityContextmenuComponent} from './activity-contextmenu.component';
import {TruncatePipe} from './truncate';
import {ActivityDetailComponent} from './activity-detail.component';
import {LogtimeComponent} from './timelog.component'
import {TimelogService} from './timelog.service'
import {LogtimeListComponent} from './timelog-list.component'
import {DurationPipe} from './durationPipe'
import {routing} from './app.routes'
import {TimerService} from "./timer.service";
import {TimerComponent} from "./timer.component"
import { MaterialModule } from '@angular/material';
import {JournalComponent} from './journal.component';
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
