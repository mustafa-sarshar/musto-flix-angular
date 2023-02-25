import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { LocalStorageService } from "./local-storage.service";

import { BACKEND_SERVER_URL } from "src/configs";
import { UtilityService } from "./utility.service";

/**
 * @class
 * @description - It holds all the services for interacting with the backend server for movie-related information.
 */
@Injectable({
  providedIn: "root",
})
export class MoviesService {
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
   * @description - It returns all the movies from the backend database.
   * @returns
   */
  public getMoviesAll(): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/populated`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError((error) => this.utilityService.handleError(error))
      );
  }

  /**
   * @method
   * @description - It returns one specific movie data from the backend database using the given movie title
   * @param title
   * @returns
   */
  public getMovie(title: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError((error) => this.utilityService.handleError(error))
      );
  }

  /**
   * @method
   * @description - It returns one specific director data from the backend database using the given director name
   * @param directorName
   * @returns
   */
  public getDirector(directorName: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError((error) => this.utilityService.handleError(error))
      );
  }

  /**
   * @method
   * @description - It returns one specific genre data from the backend database using the given genre name
   * @param genreName
   * @returns
   */
  public getGenre(genreName: string): Observable<any> {
    const token = this.localStorageService.getTokenFromLocalStorage();
    return this.http
      .get(`${BACKEND_SERVER_URL}/movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map(this.utilityService.extractResponseData),
        catchError((error) => this.utilityService.handleError(error))
      );
  }
}
