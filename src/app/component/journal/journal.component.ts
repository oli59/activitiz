import { Component }       from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {JournalLogDetailComponent} from '../journallog-detail/journallog-detail.component';
import {Journallog} from '../../domain/journallog';
import {JournallogService} from '../../service/journallog.service';
import {JournallogContextMenuService} from '../../service/journallog-contextmenu.service'
import {Observable} from "rxjs/Rx";
import {TimelogService} from '../../service/timelog.service';

@Component({selector: 'my-journal',
  templateUrl: 'journal.component.html'
  })

export class JournalComponent {
    dayLogs: [[Date, Journallog[]]];
    todayLogs: Journallog[];


  constructor(public dialog: MdDialog, private journallogService: JournallogService,
              private journallogContextMenuService: JournallogContextMenuService,
              private timelogService: TimelogService) {
    this.journallogService.getTodayJournallog().then(journalogs => this.todayLogs = journalogs)
    this.getNextNJournallog(new Date())
  }

  getBackgroundColor(status: string) {
    if (status === 'done')
      return 'lightgreen';
    if (status === 'event')
      return 'lightpink';
    if (status === 'started')
      return 'goldenrod'
    if (status === 'delayed')
      return 'tomato'
    return 'none';
  }

  getIcon(status: string) {
    if (status === 'done')
      return 'close';
      if (status === 'event')
      return 'query_builder';
    if (status == 'open')
      return 'crop_square'
    if (status === 'started')
      return 'chevron_right'
    if (status === 'delayed')
      return 'arrow_forward'
    return '';
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(JournalLogDetailComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(journalLog => {
      if (journalLog) {
        this.journallogService.save(journalLog).then(result =>
          this.journallogService.getTodayJournallog().then(journalogs => this.todayLogs = journalogs)
        )
      }
    });

  }

  contextMenu(event, journallog: Journallog) {
    this.journallogContextMenuService.showMenu(event, journallog);
    return false;
  }


  getNextNJournallog(date: Date) {
    let tempDate = date;
    let journallogList: Journallog[];

    this.journallogService.getNextJournallog(tempDate).subscribe(jl => {
        journallogList = jl;
        if (typeof journallogList === 'undefined' || journallogList === null) {
          return;
        }
        if (journallogList.length === 0) {
          return;
        }
        tempDate = new Date(journallogList[0].date);
        let jle: [Date, Journallog[]] = [tempDate, journallogList]
        if (typeof this.dayLogs === 'undefined') {
          this.dayLogs = [jle];
          this.dayLogs = [jle];
        }
        else {
          this.dayLogs.push(jle);
        }
        this.getNextNJournallog(tempDate);
      })
    }

}
