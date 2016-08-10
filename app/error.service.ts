import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';



@Injectable()
export class ErrorService {
    public errors = [];

    reset() {
        this.errors = [];
    }

    addError(error: any) {
        this.errors.push(error);
    }
}

