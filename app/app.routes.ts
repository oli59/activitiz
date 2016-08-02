import { provideRouter, RouterConfig }  from '@angular/router';
import { ActivitiesComponent} from './activities.component'

const routes: RouterConfig = [
    {
        path: 'activities',
        component: ActivitiesComponent
    },
    {
        path: '',
        redirectTo: '/activities',
        pathMatch: 'full'
    },
];

export const appRouterProviders = [
    provideRouter(routes)
];