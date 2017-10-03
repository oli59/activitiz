import {Observable} from 'rxjs/Rx'
import {Activity} from '../domain/activity';
import {Subject} from 'rxjs/Subject'

export class TimerData {
  timer: Observable<number>;
  minutes: number;
  hours: number;
  activity: Activity;
  subscription;
  isPaused: boolean;
  pausedSeconds: number;
  timelog: Subject<number>;
}
