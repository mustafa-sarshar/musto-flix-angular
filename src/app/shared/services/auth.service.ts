import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import { LocalStorageService } from "./local-storage.service";
import { ErrorService } from "./error.service";

import { UserLoginCredentials } from "../models/user.model";
import { BACKEND_SERVER_URL } from "src/configs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {}

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
      .pipe(catchError((error) => this.errorService.handleError(error)));
  }

  public isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      const usernameSaved =
        this.localStorageService.getUsernameFromLocalStorage();
      resolve(
        (usernameSaved !== undefined || usernameSaved !== "") &&
          !this.isTokenExpired()
      );
    });
    return promise;
  }

  private isTokenExpired(): boolean {
    const token = this.localStorageService.getTokenFromLocalStorage();
    if (!token) {
      return true;
    } else {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
  }
}
