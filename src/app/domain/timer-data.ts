import { Observable} from 'rxjs';
import {Activity} from '../domain/activity';
import {Subject} from 'rxjs'

export class TimerData {
  timer: Observable<number>;
  minutes: number;
  hours: number;
  activity: Activity;
  subscription;
  isPaused: boolean;
  timelog: Subject<number>;
  start_time: Date;
  paused_time: Date;
}
