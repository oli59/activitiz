import {Injectable} from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../domain/activity';
import {ErrorService} from './error.service';
import {serverUrl} from '../config/parameters';

@Injectable()
export class ActivityService {

    private activitiesUrl = serverUrl + '/activities';
    private activitiesByParent = serverUrl + '/activitiesByParent'
    private allParentsUrl = serverUrl + '/allParents';
    private allLeafsUrl = serverUrl + '/allLeafs';

    constructor(private http: Http, private errorService: ErrorService) {}

    getActivity(activityId: number) {
      return this.http.get(this.activitiesUrl + "/" + activityId)
        .toPromise()
        .then(response => response.json())
        .catch(err => {
          this.handleError(err);
        });
    }

    getActivitiesByParent(parentActivity: Activity) {
        let id = null;
        if (parentActivity != null)
            id = parentActivity.id;
        return this.http.get(this.activitiesByParent + "/" + id)
            .toPromise()
            .then(response => response.json())
            .catch(err => {
                this.handleError(err);
            });
    }

    getAllLeafActivities() {
      return this.http.get(this.allLeafsUrl)
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
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

      //Cast as number as a workaround because json stringify method sometimes detect it as a string (Weird !!) => backend server error
      activity.typical_duration = Number(activity.typical_duration);
      activity.current_points = Number(activity.current_points);
      if (activity.parent_id > 0) {
        activity.parent_id = Number(activity.parent_id);
      }

        return this.http
            .post(this.activitiesUrl, JSON.stringify(activity), options)
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

        //Cast as number as a workaround because json stringify method sometimes detect it as a string (Weird !!) => backend server error
        activity.typical_duration = Number(activity.typical_duration);
        activity.current_points = Number(activity.current_points);
        if (activity.parent_id > 0) {
          activity.parent_id = Number(activity.parent_id);
        }

        return this.http
            .put(url, JSON.stringify(activity), {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }


    //physically delete an activity
    delete(activity: Activity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});

        let url = `${this.activitiesUrl}/${activity.id}`;

        return this.http
            .delete(url, options)
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
