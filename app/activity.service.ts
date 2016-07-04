import {Injectable} from '@angular/core';
import {ACTIVITIES} from  './mock-activities';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {

    private acvititiesUrl = 'http://localhost:8080/activities';

    constructor(private http: Http) {}

    getActivities() {
        return this.http.get(this.acvititiesUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}