import {Component} from '@angular/core';
import {Activity} from './activity';
import {TimelogService} from './timelog.service';

@Component({
    selector: 'my-timelog',
    templateUrl: 'app/timelog.component.html'
})


export class LogtimeComponent {
    constructor(private timelogService: TimelogService) {}
}