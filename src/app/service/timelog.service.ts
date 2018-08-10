import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

import {Activity} from '../domain/activity';
import {ErrorService} from './error.service';
import {Timelog} from '../domain/timelog';
import {serverUrl} from '../config/parameters';
import {MatDialog} from '@angular/material';
import {catchError} from "rxjs/internal/operators/catchError";


@Injectable()
export class TimelogService {
    activity: Activity;
    timelog: Timelog;


    private timelogUrl = serverUrl + '/time_log';

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private errorService: ErrorService) {}

    logtime(timelog: Timelog, activity: Activity) {
        timelog.activity_id = activity.id;
        return this.post(timelog)
          .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
    }

    private post(timelog: Timelog) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

        return this.httpClient
            .post(this.timelogUrl, JSON.stringify(timelog), httpOptions)
          .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
    }

    getTimelog(id: number) {
      const options = { params: new HttpParams().set('id', id.toString()) };

        return this.httpClient.get(this.timelogUrl, options)
          .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
    }

    getTimelogs() {
      const options = { params: new HttpParams().set('ids', '3') };

      return this.httpClient.get(this.timelogUrl, options)
        .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
    }

}
