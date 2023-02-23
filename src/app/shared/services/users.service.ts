import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";

import { LocalStorageService } from "./local-storage.service";
import { UtilityService } from "./utility.service";

import {
  UserRegistrationCredentials,
  UserUpdateCredentials,
} from "../models/user.model";

import { BACKEND_SERVER_URL } from "src/configs";

/**
 * @class
 * @description - It holds all the services for interacting with the backend server for user related operations.
 */
@Injectable({
  providedIn: "root",
})
export class UsersService {
  /**
   * @constructor
   * @param http
   * @param localStorageService
   */
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService
  ) {}

  /**
   * @method
   * @description - It makes the api call for the user registration endpoint using the given user credentials
   * @param userCredentials
   * @returns
   */
  public userRegistration(
    userCredentials: UserRegistrationCredentials
  ): Observable<any> {
    return this.http
      .post(`${BACKEND_SERVER_URL}/users`, userCredentials)
      .pipe(catchError(this.utilityService.handleError));
  }

  /**
   * @method
   * @description - It makes the api call to get the user's data using locally saved username and token.
   * @returns
   */
  public getUser(): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    const username = this.localStorageService.getUsernameFromLocalStorage();

    return this.http
      .get(`${BACKEND_SERVER_URL}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError(this.utilityService.handleError)
      );
  }

  /**
   * @method
   * @description - It makes the api call to update the user's data using locally saved username and token and given new user data.
   * @param userCredentials
   * @returns
   */
  public updateUser(userCredentials: UserUpdateCredentials): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    const username = this.localStorageService.getUsernameFromLocalStorage();
    const userDataUpdate = {};

    if (userCredentials.username)
      userDataUpdate["username"] = userCredentials.username;
    if (userCredentials.pass) userDataUpdate["pass"] = userCredentials.pass;
    if (userCredentials.email) userDataUpdate["email"] = userCredentials.email;
    if (userCredentials.birth) userDataUpdate["birth"] = userCredentials.birth;

    return this.http
      .put(`${BACKEND_SERVER_URL}/users/${username}`, userDataUpdate, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError(this.utilityService.handleError)
      );
  }

  /**
   * @method
   * @description - It makes the api call to delete the user's account using locally saved username and token.
   * @returns
   */
  public deleteUser(): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    const username = this.localStorageService.getUsernameFromLocalStorage();

    return this.http
      .delete(`${BACKEND_SERVER_URL}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError(this.utilityService.handleError)
      );
  }

  /**
   * @method
   * @description - It makes the api call to get the user's favorites using locally saved username and token.
   * @returns
   */
  public getFavoriteMovies(): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    const username = this.localStorageService.getUsernameFromLocalStorage();

    return this.http
      .get(`${BACKEND_SERVER_URL}/users/${username}/favorites`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError(this.utilityService.handleError)
      );
  }

  /**
   * @method
   * @description - It makes the api call to add one specific movie to the user's favorites using locally saved username and token and the given movie id.
   * @param movieId
   * @returns
   */
  public addFavoriteMovieToServer(movieId: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    const username = this.localStorageService.getUsernameFromLocalStorage();

    return this.http
      .patch(
        `${BACKEND_SERVER_URL}/users/${username}/favorites/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError(this.utilityService.handleError)
      );
  }

  /**
   * @method
   * @description - It makes the api call to remove one specific movie from the user's favorites using locally saved username and token and the given movie id.
   * @param movieId
   * @returns
   */
  public removeFavoriteMovieFromServer(movieId: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    const username = this.localStorageService.getUsernameFromLocalStorage();

    return this.http
      .delete(`${BACKEND_SERVER_URL}/users/${username}/favorites/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError(this.utilityService.handleError)
      );
  }
}
