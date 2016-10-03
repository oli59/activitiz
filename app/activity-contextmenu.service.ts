import {Injectable} from "@angular/core";
import {Activity} from "./activity"
import {activityStatuses} from './activity-statuses';
import {ActivityService} from './activity.service'

@Injectable()
export class ActivityContextMenuService {
    public activity: Activity;
    public visible = false;
    public links = [];
    private timelogLink = 'Log Time';
    private mouseLocation :{left:number,top:number} = {left:0,top:0};

    constructor(private activityService: ActivityService) {}

    showMenu(event, activity: Activity) {
        this.activity = activity;
        this.links = [];
        for (status of activityStatuses) {
            if(status !== this.activity.status) {
                this.links.push(status);
            }
        }
        this.links.push(this.timelogLink);
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

        }
        else {
            this.activity.status = status;
            this.activityService.save(this.activity);
        }
        this.visible = false;
    }

}

