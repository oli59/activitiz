import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {AppComponent }         from './app.component';
import {ActivitiesComponent }      from './activities.component';
import {ActivityService} from './activity.service';
import {ErrorsComponent} from './errors.component';
import {ActivityContextmenuComponent} from './activity-contextmenu.component';
import {TruncatePipe} from './truncate';
import {ActivityDetailComponent} from './activity-detail.component';
import {MdInputModule} from '@angular2-material/input';

import {routing} from './app.routes'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MdInputModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ActivitiesComponent,
        ErrorsComponent,
        ActivityContextmenuComponent,
        TruncatePipe,
        ActivityDetailComponent,
    ],
    providers: [
        ActivityService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
