import {Component} from '@angular/core';
import {OnInit} from '@angular/core'
import {TimelogService} from '../../service/timelog.service';
import {Timelog} from "../../domain/timelog";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'my-timelog-list',
    templateUrl: 'timelog-list.component.html',
    styleUrls:['timelog-list.component.css'],
})


export class LogtimeListComponent implements OnInit {
    timelogs: Timelog[];
    dateSource: MatTableDataSource<Timelog>;

    constructor(private timelogService: TimelogService) {}

    ngOnInit(){
        this.getTimelogs();
    }

    getTimelogs() {
        this.timelogService.getTimelogs().subscribe((timelogs: Timelog[]) => {
          this.timelogs = timelogs;
          this.dateSource=new MatTableDataSource(timelogs);
        })
        /*.catch();*/
    }
}
