import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'
//import internal = require("stream");
import {Activity} from './activity';
import {TimelogService} from './timelog.service';

@Injectable()
export class TimerService {

    timers = [];

    constructor(private timelogService: TimelogService) {}

    createTimer(activity: Activity) {
        let timer = Observable.timer(0, 60000);

        let timerData = new TimerData;
        timerData.timer = timer;
        timerData.activity = activity;
        timerData.minutes = 0;
        timerData.hours = 0;
        this.timers.push(timerData);

        timerData.subscription = timer.subscribe(t=> this.calculateMinutesHours(t, timerData));
    }

    cancelTimer() {
        console.log("click");
        this.timers[0].subscription.unsubscribe();
        this.timers = [];
    }

    logTime() {
       this.timelogService.logtimeForActivityAndDuration(this.timers[0].activity, this.timers[0].hours, this.timers[0].minutes);
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
    subscription;
}
