import { Component }       from '@angular/core';


@Component({selector: 'my-journal',
  templateUrl: 'journal.component.html'
  })

export class JournalComponent {
    dayLogs: [[Date, JournalLog[]]] = DAYLOGS;
    todayLogs: JournalLog[] = LOGS;

  getBackgroundColor(status: string) {
    if (status === 'done')
      return 'lightgreen';
    if (status === 'event')
      return 'lightpink';
    if (status === 'started')
      return 'goldenrod'
    if (status === 'delayed')
      return 'tomato'
    return 'none';
  }

  getIcon(status: string) {
    if (status === 'done')
      return 'close';
    if (status === 'event')
      return 'query_builder';
    if (status == 'open')
      return 'crop_square'
    if (status === 'started')
      return 'chevron_right'
    if (status === 'delayed')
      return 'arrow_forward'
    return '';
  }

}

class JournalLog {
  date: Date;
  status: string;
  activityId: number;
  timeLogId: number;
  name: string;
}



const LOGS: JournalLog[] = [
  {date: new Date(), status: 'done' , activityId: 3, timeLogId: 1, name: 'activitiz'},
  {date: new Date(), status: 'event' , activityId: 3, timeLogId: 1, name: 'dentiste'},
  {date: new Date(), status: 'open' , activityId: 3, timeLogId: 1, name: 'appeler SDRB'},
  {date: new Date(), status: 'started' , activityId: 3, timeLogId: 1, name: 'activitiz'},
  {date: new Date(), status: 'delayed' , activityId: 3, timeLogId: 1, name: 'combo'},
];

const DAYLOGS: [[Date, JournalLog[]]] = [[ new Date(2017,1,1),[
  {date: new Date(), status: 'done' , activityId: 3, timeLogId: 1, name: 'activitiz'},
  {date: new Date(), status: 'event' , activityId: 3, timeLogId: 1, name: 'dentiste'},
  {date: new Date(), status: 'open' , activityId: 3, timeLogId: 1, name: 'appeler SDRB'},
  {date: new Date(), status: 'started' , activityId: 3, timeLogId: 1, name: 'activitiz'},
  {date: new Date(), status: 'delayed' , activityId: 3, timeLogId: 1, name: 'combo'}
  ]],
  [ new Date(2017,1,5),[
    {date: new Date(), status: 'done' , activityId: 3, timeLogId: 1, name: 'activitiz'},
    {date: new Date(), status: 'event' , activityId: 3, timeLogId: 1, name: 'dentiste'},
  ]],
];
