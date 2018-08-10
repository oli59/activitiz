import {TimelogService} from '../../service/timelog.service';
import {TimerService} from '../../service/timer.service'
import {MatDialogRef, MAT_DIALOG_DATA} from'@angular/material';
import {TimerData} from '../../domain/timer-data';
import {Timelog} from '../../domain/timelog'
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'my-timelog',
    templateUrl: 'timelog.component.html'
})


export class LogtimeComponent {
  timeLog: Timelog;

  constructor(public dialogRef: MatDialogRef<any>, private timelogService: TimelogService, private timerService: TimerService, @Inject(MAT_DIALOG_DATA) public  data: any) {
    this.timeLog = data.timelog;
  }

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    logtime () {
      this.timelogService.logtime(this.data.timelog, this.data.activity).subscribe((result: Timelog) => {
        this.dialogRef.close(result.id);
        if (this.data.timerData !== null) {
          this.timerService.emitLogtimeId(this.data.timerData, result.id);
          this.timerService.cancelTimer(this.data.timerData);
        }
      });
    }
}

