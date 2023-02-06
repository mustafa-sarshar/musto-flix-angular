import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";
import { map } from "rxjs/operators";

import { BACKEND_SERVER_URL } from "src/configs";
import {
  Movie,
  UserLoginCredentials,
  UserRegistrationCredentials,
  UserUpdateCredentials,
} from "src/models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(
    userCredentials: UserRegistrationCredentials
  ): Observable<any> {
    return this.http
      .post(`${BACKEND_SERVER_URL}/users`, userCredentials)
      .pipe(catchError(this.handleError));
  }

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
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .put(`${BACKEND_SERVER_URL}/users/${username}`, userCredentials, {
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

  public getMoviesAll(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/populated`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/genre/${genreName}`, {
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
