import {Component} from '@angular/core'
import {TimerService} from './timer.service'

@Component({
    selector: 'timer',
    template: `
        <div *ngIf="timerService.timers?.length > 0" style="float:right">
            {{timerService.timers[0].activity.name}}
            {{timerService.timers[0].hours}}:{{timerService.timers[0].minutes < 10 ? '0' : ''}}{{timerService.timers[0].minutes}}       
            <button md-icon-button>
                <md-icon>help</md-icon>
            </button>
        <div>
    `
})
export class TimerComponent {

    constructor(private timerService: TimerService) {}
}