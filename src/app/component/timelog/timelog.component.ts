import {Component} from '@angular/core';
import {TimelogService} from '../../service/timelog.service';
import {TimerService} from '../../service/timer.service'
import {MdDialogRef} from'@angular/material';
import {TimerData} from '../../domain/timer-data';

@Component({
    selector: 'my-timelog',
    templateUrl: 'timelog.component.html'
})


export class LogtimeComponent {
  constructor(public dialogRef: MdDialogRef<any>, private timelogService: TimelogService, private timerService: TimerService) {}

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

