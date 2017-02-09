import {Component} from '@angular/core'
import {TimerService} from './timer.service'

@Component({
  selector: 'timer',
  template: `
        <div *ngIf="timerService.timers?.length > 0" style="float:right">
            {{timerService.timers[0].activity.name}}
            {{timerService.timers[0].hours}}:{{timerService.timers[0].minutes < 10 ? '0' : ''}}{{timerService.timers[0].minutes}}<p>
            <div style="float:right">
              <md-icon class="md-18">play_arrow</md-icon>
              <md-icon class="md-18">pause</md-icon>
              <md-icon class="md-18">save</md-icon>
              <md-icon class="md-18">cancel</md-icon>
             </div>
        </div>
    `
})
export class TimerComponent {

  constructor(private timerService: TimerService) {}
}
