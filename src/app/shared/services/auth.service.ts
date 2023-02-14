import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { BACKEND_SERVER_URL } from "src/configs";
import { UserLoginCredentials } from "../models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = false;

  constructor(private http: HttpClient) {}

  public userLogin(userCredentials: UserLoginCredentials): Observable<any> {
    return this.http
      .post(
        `${BACKEND_SERVER_URL}/login`,
        {},
        {
          params: {
            username: userCredentials.username,
            pass: userCredentials.pass,
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Handle Errors
  private handleError(httpErrorRes: HttpErrorResponse): any {
    if (httpErrorRes.error) {
      if (httpErrorRes.error.message) {
        console.error(
          `Error Status: ${httpErrorRes.status}\nError message: ${httpErrorRes.error.message}`
        );
        return throwError({ message: httpErrorRes.error.message });
      }
    } else {
      console.error(
        `Error Status: ${httpErrorRes.status}\nError body: ${httpErrorRes.error}`
      );
      return throwError("Something went wrong! Please try again later.");
    }
  }
}
