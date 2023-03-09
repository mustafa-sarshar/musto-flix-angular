import { Component, OnDestroy, OnInit } from "@angular/core";
import { UrlTree } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { MoviesService } from "src/app/shared/services/movies.service";
import { AppMonitoringService } from "src/app/shared/services/app-monitoring.service";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";

import { CanDeactivateComponent } from "src/app/shared/guards/leave-page.guard";

import { DirectorsComponent } from "../directors/directors.component";
import { GenresComponent } from "../genres/genres.component";
import { StarsComponent } from "../stars/stars.component";
import { ConfirmationDialogComponent } from "src/app/shared/ui-gadgets/confirmation-dialog/confirmation-dialog.component";
import { DialogBox } from "src/app/shared/models/dialog.model";

import {
  Actor,
  Director,
  Genre,
  Movie,
} from "src/app/shared/models/movie.model";

import {
  CONFIRMATION_POPUP_STYLE,
  MOVIE_DETAIL_COMPONENT_STYLE,
} from "src/configs";

/**
 * @class
 * @description - It holds/shows all available/fetched movies. It also allows the users to like any movie and add them to favorites.
 */
@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent
  implements OnInit, OnDestroy, CanDeactivateComponent
{
  movies: Movie[] = [];
  favorites: string[] = [];
  searchMovieInput = "";
  isUpdatingFavorites = false;
  isDataFetching = true;
  moviesServiceSubscription = new Subscription();
  usersServiceSubscription = new Subscription();
  appMonitoringServiceSubscription = new Subscription();
  localStorageServiceSubscription = new Subscription();

  /**
   * @constructor
   * @param moviesService
   * @param usersService
   * @param appMonitoringService
   * @param localStorageService
   * @param dialog
   * @param snackBar
   */
  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private appMonitoringService: AppMonitoringService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @method
   * @description - It initializes the component by subscribing the component's variables to corresponding services.
   */
  ngOnInit(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.isDataFetching = this.appMonitoringService.getIsDataFetchingStatus();
    this.favorites = this.localStorageService.getFavoritesFromLocalStorage();
    this.localStorageServiceSubscription =
      this.localStorageService.favoritesSbj.subscribe({
        next: (favorites: string[]) => {
          this.favorites = favorites.slice();
        },
      });
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetchingSbj.subscribe({
        next: (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        },
        error: (error) => {
          console.error(error);
          this.isDataFetching = false;
        },
      });
    this.moviesServiceSubscription = this.moviesService
      .getMoviesAll()
      .subscribe({
        next: (data: any) => {
          this.movies = data;
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
        error: (error) => {
          console.error(error);
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
        complete: () => {
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
  }

  /**
   * @method
   * @description - It performs the necessary actions when the component gets destroyed.
   */
  ngOnDestroy(): void {
    this.onClosing();
  }

  /**
   * @method
   * @description - It warns the user before leaving the page, if the data fetching process is still not finished.
   * @returns
   */
  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.isUpdatingFavorites) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.dialogBox = new DialogBox(
        "Be careful!",
        "Favorite list is getting updated now! Do you really want to leave the page?"
      );
      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

  /**
   * @method
   * @description - It checks whether tha given movie Id is in the favorites list or not.
   * @param movieId
   * @returns
   */
  checkMovieIsFavorite(movieId: string): boolean {
    if (this.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @method
   * @description - It toggles the movie's status as a favorite movie
   * @param movieId
   */
  onClickToggleFavorite(movieId: string): void {
    this.isUpdatingFavorites = true;
    if (this.checkMovieIsFavorite(movieId)) {
      console.log("Lets remove it", movieId);
      this.usersService.removeFavoriteMovieFromServer(movieId).subscribe({
        next: (response) => {
          console.log("Success", response);
          this.localStorageService.removeFavoriteMovieFromLocalStorage(movieId);
          this.isUpdatingFavorites = false;
          this.snackBar.open("Movie remove from favorites.", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        error: (error) => {
          console.error("Add to favorites error:", error);
          this.isUpdatingFavorites = false;
          this.snackBar.open("Something went wrong!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        },
      });
    } else {
      console.log("Lets add it", movieId);
      this.usersService.addFavoriteMovieToServer(movieId).subscribe({
        next: (response) => {
          console.log("Success", response);
          this.localStorageService.addFavoriteMovieToLocalStorage(movieId);
          this.isUpdatingFavorites = false;
          this.snackBar.open("Movie added to favorites.", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        error: (error) => {
          console.error("Add to favorites error:", error);
          this.isUpdatingFavorites = false;
          this.snackBar.open("Something went wrong!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        },
      });
    }
  }

  /**
   * @method
   * @description - It opens the GenresComponent as a dialog.
   * @param genres
   */
  onClickGenres(genres: Genre[]): void {
    this.dialog.open(
      GenresComponent,
      MOVIE_DETAIL_COMPONENT_STYLE
    ).componentInstance.genres = genres;
  }

  /**
   * @method
   * @description - It opens the DirectorsComponent as a dialog.
   * @param directors
   */
  onClickDirectors(directors: Director[]): void {
    this.dialog.open(
      DirectorsComponent,
      MOVIE_DETAIL_COMPONENT_STYLE
    ).componentInstance.directors = directors;
  }

  /**
   * @method
   * @description - It opens the StarsComponent as a dialog.
   * @param stars
   */
  onClickStars(stars: Actor[]): void {
    this.dialog.open(
      StarsComponent,
      MOVIE_DETAIL_COMPONENT_STYLE
    ).componentInstance.stars = stars;
  }

  /**
   * @method
   * @description - It clears the search input field.
   */
  onClickClearSearchBox(): void {
    this.searchMovieInput = "";
  }

  /**
   * @method
   * @description - It performs unsubscribing from all services.
   */
  onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false); // Reset the isDataFetching variable in AppMonitoringService to false.
    this.moviesServiceSubscription.unsubscribe();
    this.usersServiceSubscription.unsubscribe();
    this.appMonitoringServiceSubscription.unsubscribe();
    this.localStorageServiceSubscription.unsubscribe();
  }
}
