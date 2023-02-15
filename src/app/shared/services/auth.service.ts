import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { User, UserLoginCredentials } from "../models/user.model";

import { BACKEND_SERVER_URL } from "src/configs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // username = "";
  user = new User("", null, null, null, null, null);

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

  public getUser(): User {
    return this.user;
  }

  public isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      const usernameSaved = localStorage.getItem("username");
      resolve(
        usernameSaved == this.user.username &&
          this.user.username !== "" &&
          (usernameSaved !== undefined || usernameSaved !== null) &&
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
