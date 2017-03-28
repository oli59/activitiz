import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent} from './component/activities/activities.component'
import {LogtimeListComponent} from './component/timelog-list/timelog-list.component'
import {JournalComponent} from './component/journal/journal.component'

const routes: Routes = [
    {
        path: 'activities',
        component: ActivitiesComponent
    },
    {
        path: '',
        redirectTo: 'activities',
        pathMatch: 'full'
    },
    {
        path: 'timelogs',
        component: LogtimeListComponent
    },
    {
      path: 'journal',
      component: JournalComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
