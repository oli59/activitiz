import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ErrorService} from './error.service';
import {Journallog} from '../domain/journallog'
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {serverUrl} from '../config/parameters';
import {catchError} from "rxjs/internal/operators/catchError";


@Injectable()
export class JournallogService {


  private journallogUrl = serverUrl + '/journal_log';
  private journallogNextUrl = serverUrl +'/journal_log/next';
  private scheduleUrl = serverUrl + '/schedule'
  private frequencyScheduleUrl = serverUrl + '/frequency_schedule'

  constructor(private httpClient: HttpClient, private errorService: ErrorService) {}

  getTodayJournallog() {
      return this.httpClient.get(this.journallogUrl + "/" + this.formatDate(new Date()))
        .pipe(
        map((response) => {
          var data = response as Journallog[];
          if (data != null) {
            data.forEach((e) => e.date = new Date(e.date))
          }
          return data;}),
          catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }


  getNextJournallog(date: Date): Observable<Journallog[]> {
    let jl = this.httpClient.get(this.journallogNextUrl + "/" + this.formatDate(date))
      .pipe(
        map((response) => {
        var data = response as Journallog[];
        if (data != null) {
          data.forEach((e) => e.date = new Date(e.date))
        }
        return data;})
      , catchError(this.errorService.handleHttpError.bind(this.errorService)));
    return jl;
  }

  save(journalLog: Journallog) {
    if (journalLog.id) {
      return this.put(journalLog);
    }
    else {
      return this.post(journalLog);
    }
  }

  schedule(maxActivities: number) {
    let url = `${this.scheduleUrl + '/' + maxActivities }`
    return this.httpClient.get(url)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }

  //schedule by frequency
  frequencySchedule() {
    return this.httpClient
      .get(this.frequencyScheduleUrl)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }

  private put(journalLog: Journallog) {

    console.log("put jounallog")

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    let url = `${this.journallogUrl}`;

    return this.httpClient
      .put(url, JSON.stringify(journalLog), httpOptions)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }

  // Add JournalLog
  private post(journalLog: Journallog) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.httpClient
      .post(this.journallogUrl, JSON.stringify(journalLog), httpOptions)
      .pipe(catchError(this.errorService.handleHttpError.bind(this.errorService)));
  }


  private formatDate(date: Date) {
    return date.getUTCFullYear()
      + (date.getUTCMonth() < 9 ? "0" : "") + (date.getUTCMonth()+1)
      + (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate()
  }
}
