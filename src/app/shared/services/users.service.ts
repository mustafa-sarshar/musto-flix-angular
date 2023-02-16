import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";

import {
  UserRegistrationCredentials,
  UserUpdateCredentials,
} from "../models/user.model";
import { BACKEND_SERVER_URL } from "src/configs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(
    userCredentials: UserRegistrationCredentials
  ): Observable<any> {
    return this.http
      .post(`${BACKEND_SERVER_URL}/users`, userCredentials)
      .pipe(catchError(this.handleError));
  }

  public getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .get(`${BACKEND_SERVER_URL}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public updateUser(userCredentials: UserUpdateCredentials): Observable<any> {
    console.log(userCredentials);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userDataUpdate = {};
    if (userCredentials.username)
      userDataUpdate["username"] = userCredentials.username;
    if (userCredentials.pass) userDataUpdate["pass"] = userCredentials.pass;
    if (userCredentials.email) userDataUpdate["email"] = userCredentials.email;
    if (userCredentials.birth) userDataUpdate["birth"] = userCredentials.birth;
    console.log(userCredentials, userDataUpdate);
    return this.http
      .put(`${BACKEND_SERVER_URL}/users/${username}`, userDataUpdate, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .delete(`${BACKEND_SERVER_URL}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .get(`${BACKEND_SERVER_URL}/users/${username}/favorites`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public addFavoriteMovieToServer(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .patch(
        `${BACKEND_SERVER_URL}/users/${username}/favorites/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public removeFavoriteMovieFromServer(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .delete(`${BACKEND_SERVER_URL}/users/${username}/favorites/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    return res || [];
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
