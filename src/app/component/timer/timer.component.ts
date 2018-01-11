import {Component} from '@angular/core'
import {TimerService} from '../../service/timer.service'
import {TimelogDialogService} from '../../service/timelog-dialog.service';

@Component({
  selector: 'timer',
  template: `
        <div *ngFor="let timer of timerService.timers" style="float:right; padding-left: 1.5em">
            {{timer.activity.name}}
            {{timer.hours}}:{{timer.minutes < 10 ? '0' : ''}}{{timer.minutes}}<p>
            <div style="float:right">
              <mat-icon *ngIf="timer.isPaused" style="color: greenyellow; cursor: pointer" (click)="timerService.resume(timer)">play_arrow</mat-icon>
              <mat-icon *ngIf="!timer.isPaused" style="color: orange; cursor: pointer" (click)="timerService.pause(timer)">pause</mat-icon>
              <mat-icon style="color: #fbd850; cursor: pointer" (click)="timelogDialogService.logtimeFromTimer(timer)">save</mat-icon>
              <mat-icon style="color: darkred; cursor: pointer" (click)="timerService.cancelTimer(timer)">cancel</mat-icon>
            </div>
        </div>
    `
})
export class TimerComponent {

  constructor(private timerService: TimerService, private timelogDialogService: TimelogDialogService) {}

}
