import {TimelogService} from '../../service/timelog.service';
import {TimerService} from '../../service/timer.service'
import {MdDialogRef} from'@angular/material';
import {TimerData} from '../../domain/timer-data';
import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {Timelog} from '../../domain/timelog'

@Component({
    selector: 'my-timelog',
    templateUrl: 'timelog.component.html'
})


export class LogtimeComponent {
  timeLog: Timelog;

  constructor(public dialogRef: MdDialogRef<any>, private timelogService: TimelogService, private timerService: TimerService, @Inject(MD_DIALOG_DATA) public  data: any) {
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
      this.timelogService.logtime(this.data.timelog, this.data.activity).then(result => {
        this.dialogRef.close(result.id);
        if (this.data.timerData !== null) {
          this.timerService.emitLogtimeId(this.data.timerData, result.id);
          this.timerService.cancelTimer(this.data.timerData);
        }
      });
    }
}

