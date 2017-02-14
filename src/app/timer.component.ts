import {Component} from '@angular/core'
import {TimerService} from './timer.service'

@Component({
  selector: 'timer',
  template: `
        <div *ngIf="timerService.timers?.length > 0" style="float:right">
            {{timerService.timers[0].activity.name}}
            {{timerService.timers[0].hours}}:{{timerService.timers[0].minutes < 10 ? '0' : ''}}{{timerService.timers[0].minutes}}<p>
            <div style="float:right">
              <md-icon style="color: greenyellow">play_arrow</md-icon>
              <md-icon style="color: orange">pause</md-icon>
              <md-icon style="color: #fbd850" (click)="timerService.logTime()">save</md-icon>
              <md-icon style="color: darkred" (click)="timerService.cancelTimer()">cancel</md-icon>
            </div>
        </div>
    `
})
export class TimerComponent {

  constructor(private timerService: TimerService) {

  }
}
