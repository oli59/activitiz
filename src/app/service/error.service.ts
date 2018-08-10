import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {throwError} from "rxjs";


@Injectable()
export class ErrorService {
    public errors = [];

    reset() {
        this.errors = [];
    }

    addError(error: any) {
        this.errors.push(error);
    }

  public handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error.message);
      this.addError('An error occurred: ' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `An error occured : backend returned code ${error.status}, and message : ${error.statusText} ` +
        `body was: ${error.error}`);
      this.addError('An error occured : backend returned code: ' + error.status + '. Message: '  + error.statusText);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

