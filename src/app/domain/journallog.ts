
export class Journallog {
  id: number;
  date: Date;
  status: string;
  activity_id: number;
  timelog_id: number;
  name: string;
}



export const LOGS: Journallog[] = [
  {id:100, date: new Date(), status: 'done' , activity_id: 3, timelog_id: 1, name: 'activitiz'},
  {id:101, date: new Date(), status: 'event' , activity_id: 3, timelog_id: 1, name: 'dentiste'},
  {id:102, date: new Date(), status: 'open' , activity_id: 3, timelog_id: 1, name: 'appeler SDRB'},
  {id:103, date: new Date(), status: 'started' , activity_id: 3, timelog_id: 1, name: 'activitiz'},
  {id:104, date: new Date(), status: 'delayed' , activity_id: 3, timelog_id: 1, name: 'combo'},
];

export const DAYLOGS: [[Date, Journallog[]]] = [[ new Date(2017,1,1),[
  {id:100, date: new Date(), status: 'done' , activity_id: 3, timelog_id: 1, name: 'activitiz'},
  {id:110, date: new Date(), status: 'event' , activity_id: 3, timelog_id: 1, name: 'dentiste'},
  {id:130, date: new Date(), status: 'open' , activity_id: 3, timelog_id: 1, name: 'appeler SDRB'},
  {id:140, date: new Date(), status: 'started' , activity_id: 3, timelog_id: 1, name: 'activitiz'},
  {id:150, date: new Date(), status: 'delayed' , activity_id: 3, timelog_id: 1, name: 'combo'}
]],
  [ new Date(2017,1,5),[
    {id:160, date: new Date(), status: 'done' , activity_id: 3, timelog_id: 1, name: 'activitiz'},
    {id:170, date: new Date(), status: 'event' , activity_id: 3, timelog_id: 1, name: 'dentiste'},
  ]],
];
