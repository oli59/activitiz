import { Component }       from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {JournalLogDetailComponent} from '../journallog-detail/journallog-detail.component';
import {Journallog, DAYLOGS, LOGS} from '../../domain/journallog';
import {JournallogService} from '../../service/journallog.service';

@Component({selector: 'my-journal',
  templateUrl: 'journal.component.html'
  })

export class JournalComponent {
    dayLogs: [[Date, Journallog[]]] = this.journallogService.getJournallog();
    todayLogs: Journallog[];


  constructor(public dialog: MdDialog, private journallogService: JournallogService) {
    this.journallogService.getTodayJournallog().then(journalogs => this.todayLogs = journalogs)
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

}
