import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'
import internal = require("stream");
import {Activity} from './activity'

@Injectable()
export class TimerService {

    timers = [];

    createTimer(activity: Activity) {
        let timer = Observable.timer(0, 1000);

        let timerData = new TimerData;
        timerData.timer = timer;
        timerData.activity = activity;
        this.timers.push(timer);

        timer.subscribe(t=> this.calculateMinutesHours(t, timerData));
    }

    calculateMinutesHours(minutes: number, timerData: TimerData) {
        timerData.minutes = minutes;
    }

}

class TimerData {
    timer: Observable;
    minutes: number;
    hours: number;
    activity: Activity;
}