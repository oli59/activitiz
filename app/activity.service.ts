import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from "./activity";

@Injectable()
export class ActivityService {

    private activitiesUrl = 'http://localhost:8080/activities';
    private allParentsUrl = 'http://localhost:8080/allParents';

    constructor(private http: Http) {}

    getActivities(parentActivity: Activity) {
        let id = null;
        if (parentActivity != null)
            id = parentActivity.id;
        return this.http.get(this.activitiesUrl + "/" + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAllParents(activity: Activity) {
        let id = null;
        if (activity != null)
            id = activity.id;
        return this.http.get(this.allParentsUrl + "/" + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
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
            .catch(this.handleError);
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
            .catch(this.handleError);
    }


    //physically delete an activity
    delete(activity: Activity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.activitiesUrl}/${activity.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }


    save(activity: Activity): Promise<Activity>  {
        if (activity.id) {
            return this.put(activity);
        }
        activity.status = 'new';
        return this.post(activity);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}