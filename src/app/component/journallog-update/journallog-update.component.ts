import { Component, Inject }       from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from'@angular/material';
import {Journallog} from '../../domain/journallog'


@Component({selector: 'my-journallog-update',
  templateUrl: './journallog-update.component.html'
})


export class JournalLogUpdateComponent {
  journallog: Journallog;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public  data: any) {
    this.journallog = data.journallog;
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

}
