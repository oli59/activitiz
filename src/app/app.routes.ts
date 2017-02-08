import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent} from './activities.component'
import {LogtimeListComponent} from './timelog-list.component'

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
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);