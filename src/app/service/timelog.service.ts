import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../domain/activity';
import {ErrorService} from './error.service';
import {Timelog} from '../domain/timelog';
import {serverUrl} from '../config/parameters';
import {MdDialog, MdDialogRef} from '@angular/material';
import {LogtimeComponent} from '../component/timelog/timelog.component'

@Injectable()
export class TimelogService {
    activity: Activity;
    timelog: Timelog;


    private timelogUrl = serverUrl + '/time_log';

  constructor(private dialog: MdDialog, private http: Http, private errorService: ErrorService) {}

    logtime(timelog: Timelog, activity: Activity): Promise<Timelog> {
        timelog.activity_id = activity.id;
        return this.post(timelog);
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

    getTimelogs() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('test', 'wow');

        return this.http.get(this.timelogUrl, {search: params})
            .toPromise()
            .then(response => response.json())
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
