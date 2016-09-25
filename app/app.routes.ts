import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent} from './activities.component'

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
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);