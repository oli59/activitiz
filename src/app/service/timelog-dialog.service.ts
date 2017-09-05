import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../domain/activity';
import {TimelogService} from './timelog.service'

import {Timelog} from '../domain/timelog';

import {MdDialog, MdDialogRef} from '@angular/material';
import {LogtimeComponent} from '../component/timelog/timelog.component'
import {TimerData} from '../domain/timer-data';
import {Observable} from "rxjs/Rx";

@Injectable()
export class TimelogDialogService {
  activity: Activity;
  timelog: Timelog;
  timerData: TimerData = null;



  constructor(private dialog: MdDialog, timeLogService: TimelogService) {}

  abortLogtime() {
    this.timerData = null;
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

    let dialogRef = this.dialog.open(LogtimeComponent, {
      disableClose: true,
      data: {
        timelog: this.timelog,
        activity: this.activity,
        timerData: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logtimeFromTimer(timerData: TimerData): Observable<any>{
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
    let dialogRef = this.dialog.open(LogtimeComponent, {
      disableClose: true,
      data: {timelog: this.timelog,
        activity: this.activity,
        timerData: this.timerData}
    });
    return dialogRef.afterClosed();
  }

  private formatHourMinute(hours: number, minutes: number) {
    return (hours < 10 ? '0': '') + hours + ':' + (minutes < 10 ? '0': '') + minutes;
  }

}
