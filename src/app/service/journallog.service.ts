import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import {ErrorService} from './error.service';
import {Journallog, DAYLOGS, LOGS} from '../domain/journallog'

@Injectable()
export class JournallogService {

  private journallogUrl = 'http://localhost:8080/journal_log';

  constructor(private http: Http, private errorService: ErrorService) {}

  getTodayJournallog() {
      let dateUrl = this.formatDate(new Date());
      console.log(dateUrl)
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
    console.log(date);
    console.log(date.getMonth());
    return date.getUTCFullYear()
      + (date.getUTCMonth() < 11 ? "0" : "") + (date.getUTCMonth()+1)
      + (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate()
  }
}
