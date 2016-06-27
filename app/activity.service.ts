import {Injectable} from '@angular/core';
import {ACTIVITIES} from  './mock-activities';

@Injectable()
export class ActivityService {

    getActivities() {
        return Promise.resolve(ACTIVITIES);
    }
}