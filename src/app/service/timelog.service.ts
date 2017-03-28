import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../domain/activity';
import {ErrorService} from './error.service';
import {Timelog} from '../domain/timelog';
import {TimerData} from './timer.service';

@Injectable()
export class TimelogService {
    showLogTimePanel = false;
    activity: Activity;
    timelog: Timelog;
    timerData: TimerData = null;

    private timelogUrl = 'http://activities.chickenkiller.com:8080/time_log';

    constructor(private http: Http, private errorService: ErrorService) {}

    abortLogtime() {
        this.timerData = null;
        this.showLogTimePanel = false;
    }

    logtime() {
        this.timelog.activity_id = this.activity.id;
        this.post(this.timelog);
        this.timerData = null;
        this.showLogTimePanel = false;
    }

    logtimeForActivity(activity: Activity) {
        this.activity = activity;
        this.timelog = new Timelog();
        this.timelog.id = null;
        this.timelog.duration = null;
        this.timelog.date = new Date(Date.now());
        let hours = this.timelog.date.getHours();
        let minutes = this.timelog.date.getMinutes();
        this.timelog.start_hour = this.formatHourMinute(hours - 1, minutes);
        this.timelog.end_hour = this.formatHourMinute(hours, minutes);
        this.showLogTimePanel = true;
    }

    logtimeFromTimer(timerData: TimerData) {
      let hours = timerData.hours;
      let minutes = timerData.minutes;

      this.activity = timerData.activity;;
      this.timerData = timerData;
      this.timelog = new Timelog();
      this.timelog.id = null;
      this.timelog.duration = null;
      this.timelog.date = new Date(Date.now());
      let startHour = (this.timelog.date.getHours() - hours) - (this.timelog.date.getMinutes() >= minutes ? 0  : 1);
      let startMinute = (this.timelog.date.getMinutes() - minutes) + (this.timelog.date.getMinutes() >= minutes ? 0 : 60);
      this.timelog.start_hour = this.formatHourMinute(startHour, startMinute);
      this.timelog.end_hour = this.formatHourMinute(this.timelog.date.getHours(), this.timelog.date.getMinutes());
      this.showLogTimePanel = true;
    }

    private formatHourMinute(hours: number, minutes: number) {
      return (hours < 10 ? '0': '') + hours + ':' + (minutes < 10 ? '0': '') + minutes;
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
