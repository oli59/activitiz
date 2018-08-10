import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {AppComponent }         from './component/app/app.component';
import {ActivitiesComponent }      from './component/activities/activities.component';
import {ActivityService} from './service/activity.service';
import {ErrorService} from './service/error.service'
import {ActivityContextMenuService} from './service/activity-contextmenu.service'
import {ErrorsComponent} from './component/errors/errors.component';
import {ActivityContextmenuComponent} from './component/activity-contextmenu/activity-contextmenu.component';
import {TruncatePipe} from './utils/pipes/truncate';
import {ActivityDetailComponent, DeleteConfirmationDialog} from './component/activity-detail/activity-detail.component';
import {LogtimeComponent} from './component/timelog/timelog.component'
import {TimelogService} from './service/timelog.service'
import {TimelogDialogService} from './service/timelog-dialog.service'
import {LogtimeListComponent} from './component/timelog-list/timelog-list.component'
import {DurationPipe} from './utils/pipes/durationPipe'
import {routing} from './app.routes'
import {TimerService} from "./service/timer.service";
import {TimerComponent} from "./component/timer/timer.component"
import {JournalComponent} from './component/journal/journal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {JournalLogDetailComponent} from './component/journallog-detail/journallog-detail.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JournallogService} from './service/journallog.service';
import {JournallogContextMenuService} from './service/journallog-contextmenu.service';
import {JournallogContextmenuComponent} from './component/journallog-contextmenu/journallog-contextmenu.component'
import {JournalLogUpdateComponent} from './component/journallog-update/journallog-update.component'
import {MatTableModule, MatExpansionModule, MatMenuModule, MatSlideToggleModule, MatToolbarModule, MatButtonToggleModule, MatSidenavModule, MatDialogModule, MatInputModule, MatSelectModule, MatRadioModule, MatIconModule, MatCardModule, MatListModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatExpansionModule,
        MatTableModule
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
        JournalComponent,
        JournalLogDetailComponent,
        JournallogContextmenuComponent,
        JournalLogUpdateComponent,
        DeleteConfirmationDialog
    ],
    entryComponents: [JournalLogDetailComponent, LogtimeComponent, JournalLogUpdateComponent, DeleteConfirmationDialog],
    providers: [
        ActivityService, ErrorService, ActivityContextMenuService, TimelogService,TimelogDialogService, TimerService, JournallogService, JournallogContextMenuService
    ],
    bootstrap: [ AppComponent, [] ]
})

export class AppModule {
}
