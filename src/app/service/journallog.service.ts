import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ErrorService} from './error.service';
import {Journallog, DAYLOGS, LOGS} from '../domain/journallog'

@Injectable()
export class JournallogService {

  getTodayJournallog() {
    return LOGS;
  }

  getJournallog() {
    return DAYLOGS;
  }

  save(journalLog: Journallog) {

  }
}
