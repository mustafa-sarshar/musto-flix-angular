import { Injectable } from "@angular/core";
import { Observable, catchError, throwError, map } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { BACKEND_SERVER_URL } from "src/configs";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getMoviesAll(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/populated`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
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
