import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import { LocalStorageService } from "./local-storage.service";
import { UtilityService } from "./utility.service";

import { UserLoginCredentials } from "../models/user.model";
import { BACKEND_SERVER_URL } from "src/configs";

/**
 * @class
 * @description - It holds the services for user authentication
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * @constructor
   * @param http
   * @param localStorageService
   * @param errorService
   */
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService
  ) {}

  /**
   * @method
   * @description - Performs the login using the given username and password
   * @param userCredentials
   * @returns
   */
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
      .pipe(catchError((error) => this.utilityService.handleError(error)));
  }

  /**
   * @method
   * @description - Based on the saved username and the expiration of the token, this methods returns a promise.
   * @returns
   */
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

  /**
   * @method
   * @description - It checks whether the locally saved token is expired or not.
   * @returns
   */
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
