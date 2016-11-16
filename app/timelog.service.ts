import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from './activity';
import {ErrorService} from './error.service'

@Injectable()
export class TimelogService {
    showLogTimePanel = false;

    abortLogtime() {
        this.showLogTimePanel = false;
    }

    logtime() {
        //DO SOMETHING
        this.showLogTimePanel = false;
    }

    logtimeForActivity(activity: Activity) {
        this.showLogTimePanel = true;
    }
}