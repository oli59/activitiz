import {Injectable} from "@angular/core";
import {Activity} from "../domain/activity"
import {activityStatuses} from '../domain/activity-statuses';
import {ActivityService} from '../service/activity.service'
import {TimelogDialogService} from './timelog-dialog.service'
import {TimerService} from './timer.service'

@Injectable()
export class ActivityContextMenuService {
    public activity: Activity;
    public visible = false;
    public links = [];
    private timelogLink = 'Log Time';
    private startTimerLink = 'Start Timer'
    private mouseLocation :{left:number,top:number} = {left:0,top:0};

    constructor(private activityService: ActivityService, private timelogDialogService: TimelogDialogService, private timerService: TimerService) {}

    showMenu(event, activity: Activity) {
        this.activity = activity;
        this.links = [];
        for (status of activityStatuses) {
            if(status !== this.activity.status) {
                this.links.push(status);
            }
        }
        this.links.push(this.timelogLink);
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
        if (link == this.timelogLink) {
            this.timelogDialogService.logtimeForActivity(this.activity);
        }
        else if (link == this.startTimerLink) {
            this.timerService.createTimer(this.activity);
        }
        else {
            this.activity.status = link;
            this.activityService.save(this.activity).subscribe();
        }
        this.visible = false;
    }

}

