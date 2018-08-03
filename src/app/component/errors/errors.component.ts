import { Component }       from '@angular/core';
import {ErrorService} from "../../service/error.service";


/*TODO this should be replaced by an angular material Banner when available*/
@Component({selector: 'my-errors',
    template:`
    <div *ngFor="let error of errorService.errors">
         <button mat-raised-button color="warn" (click)="errorService.reset()">Close</button>
        <div style="color: red;">           
            <strong>Danger!</strong> {{error}}
        </div>
    </div>
`

})
export class ErrorsComponent {

    constructor(private errorService: ErrorService) {}

}
