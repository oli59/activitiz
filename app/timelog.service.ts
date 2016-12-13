import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from './activity';
import {ErrorService} from './error.service';
import {Timelog} from './timelog';

@Injectable()
export class TimelogService {
    showLogTimePanel = false;
    activity: Activity;
    timelog: Timelog;

    private timelogUrl = 'http://localhost:8080/time_log';

    constructor(private http: Http, private errorService: ErrorService) {}

    abortLogtime() {
        this.showLogTimePanel = false;
    }

    logtime() {
        this.timelog.activity_id = this.activity.id;
        this.post(this.timelog);
        this.showLogTimePanel = false;
    }

    logtimeForActivity(activity: Activity) {
        this.activity = activity;
        this.timelog = new Timelog();
        this.timelog.id = null;
        this.timelog.duration = null;
        this.timelog.date = new Date(Date.now());
        this.timelog.start_hour = '10:00';
        this.timelog.end_hour = '10:00';
        this.showLogTimePanel = true;
    }


    private post(timelog: Timelog): Promise<Timelog> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.timelogUrl, JSON.stringify(timelog), {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }

    private handleError(error: any) {
        console.error('An error occurred', error);

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server did not reply';

        this.errorService.addError(errMsg);
        return Promise.reject(errMsg);
    }

}