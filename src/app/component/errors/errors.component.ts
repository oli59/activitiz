import { Component }       from '@angular/core';
import {ErrorService} from "../../service/error.service";

@Component({selector: 'my-errors',
    template:`
    <div class="error" *ngFor="let error of errorService.errors">
        <div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Danger!</strong> {{error}}
        </div>
    </div>
`

})
export class ErrorsComponent {

    constructor(private errorService: ErrorService) {}

}
