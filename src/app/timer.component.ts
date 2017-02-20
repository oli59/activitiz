import {Component} from '@angular/core'
import {TimerService} from './timer.service'

@Component({
  selector: 'timer',
  template: `
        <div *ngIf="timerService.timers?.length > 0" style="float:right">
            {{timerService.timers[0].activity.name}}
            {{timerService.timers[0].hours}}:{{timerService.timers[0].minutes < 10 ? '0' : ''}}{{timerService.timers[0].minutes}}<p>
            <div style="float:right">
              <md-icon *ngIf="timerService.timers[0].isPaused" style="color: greenyellow; cursor: pointer" (click)="timerService.resume()">play_arrow</md-icon>
              <md-icon *ngIf="!timerService.timers[0].isPaused" style="color: orange; cursor: pointer" (click)="timerService.pause()">pause</md-icon>
              <md-icon style="color: #fbd850; cursor: pointer" (click)="timerService.logTime()">save</md-icon>
              <md-icon style="color: darkred; cursor: pointer" (click)="timerService.cancelTimer()">cancel</md-icon>
            </div>
        </div>
    `
})
export class TimerComponent {

  constructor(private timerService: TimerService) {

  }
}
