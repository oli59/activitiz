import { Component, Inject }       from '@angular/core';
import {MdDialogRef} from'@angular/material';
import {Journallog} from '../../domain/journallog'
import {MD_DIALOG_DATA} from '@angular/material';


@Component({selector: 'my-journallog-update',
  templateUrl: './journallog-update.component.html'
})


export class JournalLogUpdateComponent {
  journallog: Journallog;

  constructor(public dialogRef: MdDialogRef<any>, @Inject(MD_DIALOG_DATA) public  data: any) {
    this.journallog = data.journallog;
  }

}
