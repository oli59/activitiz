import {Component} from '@angular/core';
import {TimelogService} from './timelog.service';

@Component({
    selector: 'my-timelog',
    templateUrl: 'timelog.component.html'
})


export class LogtimeComponent {    
    constructor(private timelogService: TimelogService) {}

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }
}
