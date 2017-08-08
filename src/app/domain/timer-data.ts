import {Observable} from 'rxjs/Rx'
import {Activity} from '../domain/activity';

export class TimerData {
  timer: Observable<number>;
  minutes: number;
  hours: number;
  activity: Activity;
  subscription;
  isPaused: boolean;
  pausedSeconds: number;
}
