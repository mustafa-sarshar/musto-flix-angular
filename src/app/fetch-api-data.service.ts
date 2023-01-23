import { Injectable } from "@angular/core";
import { catchError } from "rxjs/internal/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import * as path from "path";

import { BACKEND_SERVER_URL } from "src/configs";
import {
  UserLoginCredentials,
  UserRegistrationCredentials,
  UserUpdateCredentials,
} from "src/models";

@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(
    userCredentials: UserRegistrationCredentials
  ): Observable<any> {
    console.log(userCredentials);
    return this.http
      .post(path.join(BACKEND_SERVER_URL, "users"), userCredentials)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userCredentials: UserLoginCredentials): Observable<any> {
    console.log(userCredentials);
    return this.http
      .post(path.join(BACKEND_SERVER_URL, "login"), userCredentials)
      .pipe(catchError(this.handleError));
  }

  public getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .get(path.join(BACKEND_SERVER_URL, "users", username), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public updateUser(userCredentials: UserUpdateCredentials): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .put(path.join(BACKEND_SERVER_URL, "users", username), userCredentials, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .delete(path.join(BACKEND_SERVER_URL, "users", username), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getMoviesAll(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(path.join(BACKEND_SERVER_URL, "movies", "populated"), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(path.join(BACKEND_SERVER_URL, "movies", title), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(path.join(BACKEND_SERVER_URL, "movies", "directors", directorName), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(path.join(BACKEND_SERVER_URL, "movies", "genre", genreName), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .get(path.join(BACKEND_SERVER_URL, "users", username, "favorites"), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .put(
        path.join(BACKEND_SERVER_URL, "users", username, "favorites", movieId),
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .delete(
        path.join(BACKEND_SERVER_URL, "users", username, "favorites", movieId),
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const { body } = res;
    return body || {};
  }

  // Handle Errors
  private handleError(httpErrorRes: HttpErrorResponse): any {
    if (httpErrorRes.error instanceof ErrorEvent) {
      console.error("Some error occurred:", httpErrorRes.error.message);
    } else {
      console.error(
        `Error Status code ${httpErrorRes.status}, ` +
          `Error body is: ${httpErrorRes.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
