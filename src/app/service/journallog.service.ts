import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response } from '@angular/http';
import {ErrorService} from './error.service';
import {Journallog} from '../domain/journallog'
import {Observable} from 'rxjs/Rx'
import {serverUrl} from '../config/parameters';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JournallogService {


  private journallogUrl = serverUrl + '/journal_log';
  private journallogNextUrl = serverUrl +'/journal_log/next';
  private scheduleUrl = serverUrl + '/schedule'

  constructor(private http: Http, private errorService: ErrorService) {}

  getTodayJournallog() {
      return this.http.get(this.journallogUrl + "/" + this.formatDate(new Date()))
        .map((response: Response) => {
          var data = response.json() as Journallog[];
          if (data != null) {
            data.forEach((e) => e.date = new Date(e.date))
          }
          return data;})
        .catch((error:any) => {
          this.handleError(error);
          return Observable.throw(error.json().error)
        });
  }


  getNextJournallog(date: Date): Observable<Journallog[]> {
    let jl = this.http.get(this.journallogNextUrl + "/" + this.formatDate(date))
      .map((response: Response) => {
        var data = response.json() as Journallog[];
        if (data != null) {
          data.forEach((e) => e.date = new Date(e.date))
        }
        return data;})
      .catch((error:any) => {
        this.handleError(error);
        return Observable.throw(error.json().error)
      });
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
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json())
      .catch(err => {
        this.handleError(err);
      });
  }

  private put(journalLog: Journallog) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.journallogUrl}`;

    return this.http
      .put(url, JSON.stringify(journalLog), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(err => {
        this.handleError(err);
      });
  }

  // Add JournalLog
  private post(journalLog: Journallog): Promise<Journallog> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
      .post(this.journallogUrl, JSON.stringify(journalLog), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(err => {
        this.handleError(err);
      });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server did not reply';

    this.errorService.addError(errMsg);
    return Promise.reject(errMsg);
  }

  private formatDate(date: Date) {
    return date.getUTCFullYear()
      + (date.getUTCMonth() < 9 ? "0" : "") + (date.getUTCMonth()+1)
      + (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate()
  }
}
