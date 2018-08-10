import {Injectable} from "@angular/core";
import {Journallog} from "../domain/journallog"
import {journallogStatuses} from '../domain/journallog-statuses';
import {JournallogService} from './journallog.service'
import {TimelogDialogService} from './timelog-dialog.service'
import {TimerService} from './timer.service'
import {Activity} from '../domain/activity';
import {ActivityService} from './activity.service';
import {MatDialog} from '@angular/material';
import {JournalLogUpdateComponent} from '../component/journallog-update/journallog-update.component';

@Injectable()
export class JournallogContextMenuService {
  public activity:Activity
  public journallog:Journallog;
  public visible = false;
  public links = [];
  private startTimerLink = 'Start Timer'
  private editLink = 'Edit'
  private mouseLocation:{left:number,top:number} = {left: 0, top: 0};

  constructor(private journallogService:JournallogService, private timelogDialogService:TimelogDialogService, private timerService:TimerService,
              private activityService:ActivityService, private dialog: MatDialog) {
  }

  showMenu(event, journallog:Journallog) {
    this.journallog = journallog;
    this.links = [];
    if (this.journallog.status !== 'event') {
      for (status of journallogStatuses) {
        if (status !== this.journallog.status && status !== 'event') {
          this.links.push(status);
        }
      }
      this.activityService.getActivity(journallog.activity_id).subscribe((result: Activity) => this.activity = result);
    }
    this.links.push(this.editLink)
    if ((this.journallog.status === 'open' || this.journallog.status === 'event') && this.journallog.timelog_id === null) {
      this.links.push(this.startTimerLink)
    }
    this.mouseLocation = {
      left: event.clientX,
      top: event.clientY
    }
    this.visible = true;
  }

  get locationCss() {
    return {
      'position': 'fixed',
      'display': this.visible ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px',
    };
  }


  menuClicked(link) {
    if (link === this.startTimerLink) {
      this.timerService.createTimer(this.activity).subscribe(value => {
        this.journallog.timelog_id = value;
        this.journallogService.save(this.journallog).subscribe();
      });
    }
    else if (link === 'done') {
      this.journallog.status = link;
      this.journallogService.save(this.journallog).subscribe()
      if (this.journallog.timelog_id === null) {
        this.timelogDialogService.logtimeForActivity(this.activity).subscribe(value => {
          if (value !== undefined) {
            this.journallog.timelog_id = value;
            this.journallogService.save(this.journallog).subscribe();
          }
        })
      }
    }
    else if (link === 'open') {
      this.journallog.status = link;
      this.journallogService.save(this.journallog).subscribe()
    }
    else if (link === 'delayed') {
      this.journallog.status = link;
      this.proposeNewDate();
      this.journallogService.save(this.journallog).subscribe()
    }
    else if (link === 'started') {
      this.journallog.status = link;
      this.proposeNewDate();
      if (this.journallog.timelog_id === null) {
        this.timelogDialogService.logtimeForActivity(this.activity).subscribe(value => {
          if (value !== undefined) {
            this.journallog.timelog_id = value;
            this.journallogService.save(this.journallog).subscribe();
          }
        })
      }
      this.journallogService.save(this.journallog).subscribe()
    }
    else if (link === this.editLink) {
      this.openUpdateDialog(this.journallog)
    }
    this.visible = false;
  }

  proposeNewDate() {
    var newJournalLog : Journallog = new Journallog;
    newJournalLog.activity_id = this.journallog.activity_id;
    newJournalLog.date = new Date();
    newJournalLog.date.setDate(this.journallog.date.getDate() + 1);
    newJournalLog.name = this.journallog.name;
    newJournalLog.status = 'open';
    this.openUpdateDialog(newJournalLog);
  }


  openUpdateDialog(inJournallog: Journallog) {
    let dialogRef = this.dialog.open(JournalLogUpdateComponent, {
      disableClose: true,
      data: {
        journallog: inJournallog
      }
    });
    dialogRef.afterClosed().subscribe(value => {
      console.log(value);
      if (value) {
          this.journallogService.save(value)
          //TODO Voir comment mettre à jour le front end (= deplacer les cartes avec la nouvelle carte créée/éditée)
      }
    });

  }



}

