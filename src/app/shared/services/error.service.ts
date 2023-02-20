import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  constructor() {}

  // Handle Errors
  public handleError(httpErrorRes: HttpErrorResponse): any {
    if (httpErrorRes.error) {
      if (httpErrorRes.error.message) {
        console.error(
          `Error Status: ${httpErrorRes.status}\nError message: ${httpErrorRes.error.message}`
        );

        return throwError(() => {
          message: httpErrorRes.error.message;
        });
      }
    } else {
      console.error(
        `Error Status: ${httpErrorRes.status}\nError body: ${httpErrorRes.error}`
      );

      return throwError("Something went wrong! Please try again later.");
    }
  }
}
