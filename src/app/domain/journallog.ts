
export class Journallog {
  date: Date;
  status: string;
  activityId: number;
  timeLogId: number;
  name: string;
}



export const LOGS: Journallog[] = [
  {date: new Date(), status: 'done' , activityId: 3, timeLogId: 1, name: 'activitiz'},
  {date: new Date(), status: 'event' , activityId: 3, timeLogId: 1, name: 'dentiste'},
  {date: new Date(), status: 'open' , activityId: 3, timeLogId: 1, name: 'appeler SDRB'},
  {date: new Date(), status: 'started' , activityId: 3, timeLogId: 1, name: 'activitiz'},
  {date: new Date(), status: 'delayed' , activityId: 3, timeLogId: 1, name: 'combo'},
];

export const DAYLOGS: [[Date, Journallog[]]] = [[ new Date(2017,1,1),[
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
