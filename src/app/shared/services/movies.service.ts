import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { LocalStorageService } from "./local-storage.service";

import { BACKEND_SERVER_URL } from "src/configs";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {}

  public getMoviesAll(): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/populated`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError((error) => this.errorService.handleError(error))
      );
  }

  public getMovie(title: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError((error) => this.errorService.handleError(error))
      );
  }

  public getDirector(directorName: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError((error) => this.errorService.handleError(error))
      );
  }

  public getGenre(genreName: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError((error) => this.errorService.handleError(error))
      );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    return res || [];
  }
}
