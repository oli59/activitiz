import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from './activity';
import {ErrorService} from './error.service'

@Injectable()
export class ActivityService {

    private activitiesUrl = 'http://activities.chickenkiller.com:8080/activities';
    private allParentsUrl = 'http://activities.chickenkiller.com:8080/allParents';

    constructor(private http: Http, private errorService: ErrorService) {}

    getActivities(parentActivity: Activity) {
        let id = null;
        if (parentActivity != null)
            id = parentActivity.id;
        return this.http.get(this.activitiesUrl + "/" + id)
            .toPromise()
            .then(response => response.json())
            .catch(err => {
                this.handleError(err);
            });
    }

    getAllParents(activity: Activity) {
        let id = null;
        if (activity != null)
            id = activity.id;
        return this.http.get(this.allParentsUrl + "/" + id)
            .toPromise()
            .then(response => response.json())
            .catch(err => {
                this.handleError(err);
            });
    }


    // Add new Activity
    private post(activity: Activity): Promise<Activity> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        console.log("activity_parent: " + activity.parent_id);

        return this.http
            .post(this.activitiesUrl, JSON.stringify(activity), {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }


    //Update activity
    private put(activity: Activity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.activitiesUrl}`;

        return this.http
            .put(url, JSON.stringify(activity), {headers: headers})
            .toPromise()
            .then(() => activity)
            .catch(err => {
                this.handleError(err);
            });
    }


    //physically delete an activity
    delete(activity: Activity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.activitiesUrl}/${activity.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(err => {
                this.handleError(err);
            });
    }


    save(activity: Activity): Promise<Activity>  {
        console.log("save");
        if (activity.id) {
            return this.put(activity);
        }
        else {
            activity.status = 'new';
            return this.post(activity);
        }
    }

    private handleError(error: any) {
        console.error('An error occurred', error);

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server did not reply';

        this.errorService.addError(errMsg);
        return Promise.reject(errMsg);
    }
}