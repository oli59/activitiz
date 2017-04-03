import { Component }       from '@angular/core';
import {MdDialogRef} from'@angular/material';

@Component({selector: 'my-journallog-detail',
  templateUrl: './journallog-detail.component.html'
})


export class JournalLogDetailComponent {

  constructor(public dialogRef: MdDialogRef<any>) {}

}
