import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'
//import internal = require("stream");
import {Activity} from '../domain/activity';
import {TimerData} from '../domain/timer-data';
import {Subject} from 'rxjs/Subject'

@Injectable()
export class TimerService {


    timers: TimerData[] = [];

    constructor() {}

    createTimer(activity: Activity) : Subject<number> {
        let timer = Observable.timer(0, 1000);


        let timerData = new TimerData;
        timerData.timer = timer;
        timerData.activity = activity;
        timerData.minutes = 0;
        timerData.hours = 0;
        timerData.start_time = new Date();
        timerData.isPaused = false;
        timerData.timelog = new Subject<number>()
        this.timers.push(timerData);

        timerData.subscription = timer.subscribe(t=> this.calculateMinutesHours(timerData));

        return timerData.timelog;
    }

    cancelTimer(timerData: TimerData) {
        timerData.subscription.unsubscribe();
        let index = this.timers.indexOf(timerData);
        if (index >= 0) {
          this.timers.splice(index, 1);
        }
    }

    pause(timerData: TimerData) {
      timerData.isPaused = true;
      timerData.paused_time = new Date();
    }

    resume(timerData: TimerData) {
      let tempNewDate = new Date();
      timerData.isPaused = false;
      tempNewDate.setTime(new Date().getTime() - (timerData.paused_time.getTime() - timerData.start_time.getTime()));
      timerData.start_time = tempNewDate;
    }

    calculateMinutesHours(timerData: TimerData) {
      let ellapsedMillisec: number;
      if (timerData.isPaused) {
        return;
      }

      ellapsedMillisec = new Date().getTime() - timerData.start_time.getTime();

      let minutes = Math.floor((ellapsedMillisec/1000) / 60 );
      timerData.hours = Math.floor(minutes / 60);
      timerData.minutes = minutes - (60 * timerData.hours);
    }

    emitLogtimeId(timerData: TimerData, val: number) {
      timerData.timelog.next(val);
      timerData.timelog.complete();
    }

}

