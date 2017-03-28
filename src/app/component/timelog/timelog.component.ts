import {Component} from '@angular/core';
import {TimelogService} from '../../service/timelog.service';
import {TimerService, TimerData} from '../../service/timer.service'

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
      let timerData = this.timelogService.timerData;
      this.timelogService.logtime();
      this.timerService.cancelTimer(timerData);
    }
}

