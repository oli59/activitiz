import {Injectable} from "@angular/core";
import {Journallog} from "../domain/journallog"
import {journallogStatuses} from '../domain/journallog-statuses';
import {JournallogService} from './journallog.service'
import {TimelogDialogService} from './timelog-dialog.service'
import {TimerService} from './timer.service'
import {Activity} from '../domain/activity';
import {ActivityService} from './activity.service';

@Injectable()
export class JournallogContextMenuService {
  public activity: Activity
  public journallog: Journallog;
  public visible = false;
  public links = [];
  private startTimerLink = 'Start Timer'
  private editLink = 'Edit'
  private mouseLocation :{left:number,top:number} = {left:0,top:0};

  constructor(private journallogService: JournallogService, private timelogDialogService: TimelogDialogService, private timerService: TimerService,
              private activityService: ActivityService) {}

  showMenu(event, journallog: Journallog) {
    this.journallog = journallog;
    this.links = [];
    if (this.journallog.status !== 'event') {
      for (status of journallogStatuses) {
        if (status !== this.journallog.status && status !== 'event') {
          this.links.push(status);
        }
      }
    this.activityService.getActivity(journallog.activity_id).then(result => {
      this.activity = result;
      })
    }
    this.links.push(this.editLink)
    if ((this.journallog.status === 'open' || this.journallog.status === 'event') && this.journallog.timelog_id === null) {
      this.links.push(this.startTimerLink)
    }
    this.mouseLocation = {
      left:event.clientX,
      top:event.clientY
    }
    this.visible = true;
  }

  get locationCss(){
    return {
      'position':'fixed',
      'display':this.visible ?  'block':'none',
      left:this.mouseLocation.left + 'px',
      top:this.mouseLocation.top + 'px',
    };
  }

  menuClicked(link) {
    if (link === this.startTimerLink) {
      this.timerService.createTimer(this.activity).subscribe(value => {
        this.journallog.timelog_id = value;
        this.journallogService.save(this.journallog);
      });
    }
    else if (link === 'done'){
      this.journallog.status = link;
      this.journallogService.save(this.journallog)
      if (this.journallog.timelog_id === null) {
        this.timelogDialogService.logtimeForActivity(this.activity).subscribe(value => {
          this.journallog.timelog_id = value;
          this.journallogService.save(this.journallog);
        })
      }
    }
    else if (link === 'open') {
      this.journallog.status = link;
      this.journallogService.save(this.journallog)
    }
    else if (link === 'delayed') {
      this.journallog.status = link;
      //TODO choisir une nouvelle date = créer une copie avec la nouvelle date
      this.journallogService.save(this.journallog)
    }
    else if (link === 'started') {
      this.journallog.status = link;
      //TODO choisir une nouvelle date = créer une copie avec la nouvelle date
      //TODO si le logTime n'est pas encore présent, il faut ouvrir la fenêtre pour logguer
      this.journallogService.save(this.journallog)
    }
    else if (link === this.editLink) {
      //TODO on fera ça bien plus tard si c'est nécessaire. Sinon on oublie.
    }
    this.visible = false;
  }

}

