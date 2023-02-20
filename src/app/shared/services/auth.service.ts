import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

import { UserLoginCredentials } from "../models/user.model";

import { BACKEND_SERVER_URL } from "src/configs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public userLogin(userCredentials: UserLoginCredentials): Observable<any> {
    return this.http
      .post(
        `${BACKEND_SERVER_URL}/login`,
        {},
        {
          params: new HttpParams()
            .set("username", userCredentials.username)
            .set("pass", userCredentials.pass),
        }
      )
      .pipe(catchError(this.handleError));
  }

  public isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      const usernameSaved = localStorage.getItem("username");
      resolve(
        (usernameSaved !== undefined || usernameSaved !== "") &&
          !this.isTokenExpired()
      );
    });
    return promise;
  }

  private isTokenExpired(): boolean {
    const token = localStorage.getItem("token");
    if (!token) {
      return true;
    } else {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
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
