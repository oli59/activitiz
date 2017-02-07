import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'
import internal = require("stream");
import {Activity} from './activity'

@Injectable()
export class TimerService {

    timers = [];

    createTimer(activity: Activity) {
        let timer = Observable.timer(0, 60000);

        let timerData = new TimerData;
        timerData.timer = timer;
        timerData.activity = activity;
        timerData.minutes = 0;
        timerData.hours = 0;
        this.timers.push(timerData);

        timer.subscribe(t=> this.calculateMinutesHours(t, timerData));
    }

    calculateMinutesHours(minutes: number, timerData: TimerData) {
        timerData.hours = Math.floor(minutes / 60);
        timerData.minutes = minutes - (60 * timerData.hours);
    }

}

class TimerData {
    timer: Observable<number>;
    minutes: number;
    hours: number;
    activity: Activity;
}