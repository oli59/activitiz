import {Injectable} from "@angular/core";
import {Journallog} from "../domain/journallog"
import {journallogStatuses} from '../domain/journallog-statuses';
import {JournallogService} from '../service/journallog.service'
import {TimelogService} from './timelog.service'
import {TimerService} from './timer.service'
import {Activity} from "../domain/activity";
import {ActivityService} from "../service/activity.service"

@Injectable()
export class JournallogContextMenuService {
  public activity: Activity
  public journallog: Journallog;
  public visible = false;
  public links = [];
  private startTimerLink = 'Start Timer'
  private editLink = 'Edit'
  private mouseLocation :{left:number,top:number} = {left:0,top:0};

  constructor(private journallogService: JournallogService, private timelogService: TimelogService, private timerService: TimerService,
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
    this.links.push(this.startTimerLink)
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
      this.timerService.createTimer(this.activity);
    } else if (link === 'done'){
      this.journallog.status = link;
      //TODO si le logTime n'est pas encore présent, il faut l'ajouter
    } else if (link === 'open') {
      this.journallog.status = link;
      //TODO remettre sur open simplement
    } else if (link === 'delayed') {
      this.journallog.status = link;
      //TODO changer le statut
      //TODO choisir une nouvelle date
    } else if (link === 'started') {
      this.journallog.status = link;
      //TODO changer le statut
      //TODO si le logTime n'est pas encore présent, il faut l'ajouter
      //TODO choisir une nouvelle date
    } else if (link === this.editLink) {
      //TODO on fera ça bien plus tard si c'est nécessaire. Sinon on oublie.
    }
    this.visible = false;
  }

}

