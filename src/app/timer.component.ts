import {Component} from '@angular/core'
import {TimerService} from './timer.service'

@Component({
  selector: 'timer',
  template: `
        <div *ngFor="let timer of timerService.timers" style="float:right; padding-left: 1.5em">
            {{timer.activity.name}}
            {{timer.hours}}:{{timer.minutes < 10 ? '0' : ''}}{{timer.minutes}}<p>
            <div style="float:right">
              <md-icon *ngIf="timer.isPaused" style="color: greenyellow; cursor: pointer" (click)="timerService.resume(timer)">play_arrow</md-icon>
              <md-icon *ngIf="!timer.isPaused" style="color: orange; cursor: pointer" (click)="timerService.pause(timer)">pause</md-icon>
              <md-icon style="color: #fbd850; cursor: pointer" (click)="timerService.logTime(timer)">save</md-icon>
              <md-icon style="color: darkred; cursor: pointer" (click)="timerService.cancelTimer(timer)">cancel</md-icon>
            </div>
        </div>
    `
})
export class TimerComponent {

  constructor(private timerService: TimerService) {

  }
}
