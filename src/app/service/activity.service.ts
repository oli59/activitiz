import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Activity} from '../domain/activity';
import {ErrorService} from './error.service';
import {serverUrl} from '../config/parameters';
import {catchError } from "rxjs/internal/operators";

@Injectable()
export class ActivityService {

  private activitiesUrl = serverUrl + '/activities';
  private activitiesByParent = serverUrl + '/activitiesByParent'
  private allParentsUrl = serverUrl + '/allParents';
  private allLeafsUrl = serverUrl + '/allLeafs';

  constructor(private httpClient:HttpClient, private errorService:ErrorService) {
  }

  getActivity(activityId:number) {
    return this.httpClient.get(this.activitiesUrl + "/" + activityId)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }

  getActivitiesByParent(parentActivity:Activity) {
    let id = null;
    if (parentActivity != null)
      id = parentActivity.id;

    return this.httpClient.get(this.activitiesByParent + "/" + id)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }

  getAllLeafActivities() {
    return this.httpClient.get(this.allLeafsUrl)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }

  getAllParents(activity:Activity) {
    let id = null;
    if (activity != null)
      id = activity.id;
    return this.httpClient.get(this.allParentsUrl + "/" + id)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }


  // Add new Activity
  private post(activity:Activity) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    //Cast as number as a workaround because json stringify method sometimes detect it as a string (Weird !!) => backend server error
    activity.typical_duration = Number(activity.typical_duration);
    activity.current_points = Number(activity.current_points);
    activity.scheduling_pace = Number(activity.scheduling_pace);
    if (activity.parent_id > 0) {
      activity.parent_id = Number(activity.parent_id);
    }

    return this.httpClient
      .post(this.activitiesUrl, JSON.stringify(activity), httpOptions)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }


  //Update activity
  private put(activity:Activity) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    let url = `${this.activitiesUrl}`;

    //Cast as number as a workaround because json stringify method sometimes detect it as a string (Weird !!) => backend server error
    activity.typical_duration = Number(activity.typical_duration);
    activity.current_points = Number(activity.current_points);
    activity.scheduling_pace = Number(activity.scheduling_pace);
    if (activity.parent_id > 0) {
      activity.parent_id = Number(activity.parent_id);
    }

    return this.httpClient
      .put(url, JSON.stringify(activity), httpOptions)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }


  //physically delete an activity
  delete(activity:Activity) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    let url = `${this.activitiesUrl}/${activity.id}`;

    return this.httpClient
      .delete(url, httpOptions)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }


  save(activity:Activity) {
    console.log("save");
    if (activity.id) {
      return this.put(activity);
    }
    else {
      activity.status = 'new';
      return this.post(activity);
    }
  }

}
