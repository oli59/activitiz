import {Component} from '@angular/core';
import {TimelogService} from './timelog.service';
import {TimerService} from './timer.service'

@Component({
    selector: 'my-timelog',
    templateUrl: 'timelog.component.html'
})


export class LogtimeComponent {
    constructor(private timelogService: TimelogService, private timerService: TimerService) {}

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    logtime () {
      this.timelogService.logtime()
      this.timerService.cancelTimer();
    }
}

