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

import {
  Actor,
  Director,
  Genre,
  Movie,
} from "src/app/shared/models/movie.model";

import { MOVIE_DETAIL_COMPONENT_STYLE } from "src/configs";

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

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private appMonitoringService: AppMonitoringService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

  ngOnDestroy(): void {
    this.onClosing();
  }

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.isUpdatingFavorites) {
      return confirm(
        "Favorite list is getting updated now! Do you really want to leave the page?"
      );
    } else {
      return true;
    }
  }

  checkMovieIsFavorite(movieId: string): boolean {
    if (this.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

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

  onClickGenres(genres: Genre[]): void {
    this.dialog.open(
      GenresComponent,
      MOVIE_DETAIL_COMPONENT_STYLE
    ).componentInstance.genres = genres;
  }

  onClickDirectors(directors: Director[]): void {
    this.dialog.open(
      DirectorsComponent,
      MOVIE_DETAIL_COMPONENT_STYLE
    ).componentInstance.directors = directors;
  }

  onClickStars(stars: Actor[]): void {
    this.dialog.open(
      StarsComponent,
      MOVIE_DETAIL_COMPONENT_STYLE
    ).componentInstance.stars = stars;
  }

  onClickClearSearchBox(): void {
    this.searchMovieInput = "";
  }

  onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.moviesServiceSubscription.unsubscribe();
    this.usersServiceSubscription.unsubscribe();
    this.appMonitoringServiceSubscription.unsubscribe();
    this.localStorageServiceSubscription.unsubscribe();
  }
}
