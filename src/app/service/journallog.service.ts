import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import {ErrorService} from './error.service';
import {Journallog, DAYLOGS, LOGS} from '../domain/journallog'
import {isUndefined} from "util";

@Injectable()
export class JournallogService {

  private journallogUrl = 'http://localhost:8080/journal_log';
  private journallogNextUrl = 'http://localhost:8080/journal_log/next';

  constructor(private http: Http, private errorService: ErrorService) {}

  getTodayJournallog() {
      return this.http.get(this.journallogUrl + "/" + this.formatDate(new Date()))
        .toPromise()
        .then(response => response.json())
        .catch(err => {
          this.handleError(err);
        });
  }

  getJournallog() {
    return DAYLOGS;
  }

  getNextNJournallog(date: Date, iterationsNb: number) {
    let result: [[Date, Journallog[]]];
    let tempDate = date;
    let i: number;
    let journallogList: Journallog[];

    for(i = iterationsNb;  i > 0;i--) {
      this.getNextJournallog(tempDate).then(jl => {
        journallogList = jl;
        if (typeof journallogList === 'undefined' || journallogList === null) {
          return result;
        }
        if (journallogList.length === 0) {
          return result;
        }
        tempDate = journallogList[0].date;
        let jle: [Date, Journallog[]] = [tempDate, journallogList]
        if (typeof result === 'undefined') {
          result = [jle];
        }
        else {
          result.push(jle);
        }
      })
    }
    console.log(result);
    return result;
  }

  getNextJournallog(date: Date) {
    return this.http.get(this.journallogNextUrl + "/" + this.formatDate(date))
      .toPromise()
      .then(response => response.json())
      .catch(err => {
        this.handleError(err);
      });
  }

  save(journalLog: Journallog) {
    console.log("save");
    if (journalLog.id) {
      //return this.put(journalLog);
    }
    else {
      return this.post(journalLog);
    }
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
      + (date.getUTCMonth() < 11 ? "0" : "") + (date.getUTCMonth()+1)
      + (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate()
  }
}
