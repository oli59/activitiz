import {Component} from '@angular/core';
import {OnInit} from '@angular/core'
import {TimelogService} from './timelog.service';
import {Timelog} from "./timelog";

@Component({
    selector: 'my-timelog-list',
    templateUrl: 'timelog-list.component.html',
    styleUrls:['timelog-list.component.css'],
})


export class LogtimeListComponent implements OnInit {
    timelogs: Timelog[];

    constructor(private timelogService: TimelogService) {}

    ngOnInit(){
        this.getTimelogs();
    }

    getTimelogs() {
        this.timelogService.getTimelogs().then(timelogs => this.timelogs = timelogs)
        /*.catch();*/
    }




}
