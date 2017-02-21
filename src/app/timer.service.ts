import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'
//import internal = require("stream");
import {Activity} from './activity';
import {TimelogService} from './timelog.service';

@Injectable()
export class TimerService {

    timers: TimerData[] = [];

    constructor(private timelogService: TimelogService) {}

    createTimer(activity: Activity) {
        let timer = Observable.timer(0, 1000);

        let timerData = new TimerData;
        timerData.timer = timer;
        timerData.activity = activity;
        timerData.minutes = 0;
        timerData.hours = 0;
        timerData.pausedSeconds = 0;
        timerData.isPaused = false;
        this.timers.push(timerData);

        timerData.subscription = timer.subscribe(t=> this.calculateMinutesHours(t, timerData));
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
    }

    resume(timerData: TimerData) {
      timerData.isPaused = false;
    }

    logTime(timerData: TimerData) {
       this.timelogService.logtimeFromTimer(timerData);
    }

    calculateMinutesHours(seconds: number, timerData: TimerData) {
      if (timerData.isPaused) {
        timerData.pausedSeconds++;
      }

      let minutes = Math.floor((seconds - timerData.pausedSeconds) / 60 );
      timerData.hours = Math.floor(minutes / 60);
      timerData.minutes = minutes - (60 * timerData.hours);
    }

}

export class TimerData {
    timer: Observable<number>;
    minutes: number;
    hours: number;
    activity: Activity;
    subscription;
    isPaused: boolean;
    pausedSeconds: number;
}
