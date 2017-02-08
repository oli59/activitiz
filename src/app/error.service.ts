import {Injectable} from "@angular/core";


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

