import { Component, OnInit } from "@angular/core";
import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { MoviesService } from "src/app/shared/services/movies.service";

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

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit, CanDeactivateComponent {
  movies: Movie[] = [];
  favorites: string[] = [];
  updatingFavoritesMode = false;

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.favorites = localStorage.getItem("favorites").split(",");
    this.loadMovies();
  }

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.updatingFavoritesMode) {
      return confirm(
        "Favorite list is getting updated now! Do you really want to leave the page?"
      );
    } else {
      return true;
    }
  }

  loadMovies(): void {
    this.moviesService.getMoviesAll().subscribe((data: any) => {
      this.movies = data;
    });
  }

  checkMovieIsFavorite(movieId: string): boolean {
    if (this.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  onClickToggleFavorite(movieId: string): void {
    this.updatingFavoritesMode = true;
    if (this.checkMovieIsFavorite(movieId)) {
      console.log("Lets remove it", movieId);
      this.usersService.removeFavoriteMovieFromServer(movieId).subscribe(
        (response) => {
          console.log("Success", response);
          this.removeFavoriteMovieFromLocalStorage(movieId);
          this.updatingFavoritesMode = false;
          this.snackBar.open("Movie remove from favorites.", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        (error) => {
          console.error("Add to favorites error:", error);
          this.updatingFavoritesMode = false;
          this.snackBar.open("Something went wrong!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        }
      );
    } else {
      console.log("Lets add it", movieId);
      this.usersService.addFavoriteMovieToServer(movieId).subscribe(
        (response) => {
          console.log("Success", response);
          this.addFavoriteMovieToLocalStorage(movieId);
          this.updatingFavoritesMode = false;
          this.snackBar.open("Movie added to favorites.", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        (error) => {
          console.error("Add to favorites error:", error);
          this.updatingFavoritesMode = false;
          this.snackBar.open("Something went wrong!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        }
      );
    }
  }

  addFavoriteMovieToLocalStorage(movieId: string): void {
    this.favorites.push(movieId);
    localStorage.setItem("favorites", this.favorites.toString());
  }

  removeFavoriteMovieFromLocalStorage(movieId: string): void {
    const movieIdIndex = this.favorites.indexOf(movieId);

    if (movieIdIndex > -1) {
      this.favorites.splice(movieIdIndex, 1);
      localStorage.setItem("favorites", this.favorites.toString());
    } else {
      console.error("Couldn't remove the favorite movie from local storage");
    }
  }

  onClickGenres(genres: Genre[]): void {
    this.dialog.open(GenresComponent, {
      width: "95%",
      minWidth: "250px",
      maxWidth: "480px",
    }).componentInstance.genres = genres;
  }

  onClickDirectors(directors: Director[]): void {
    this.dialog.open(DirectorsComponent, {
      width: "95%",
      minWidth: "250px",
      maxWidth: "480px",
    }).componentInstance.directors = directors;
  }

  onClickStars(stars: Actor[]): void {
    this.dialog.open(StarsComponent, {
      width: "95%",
      minWidth: "250px",
      maxWidth: "480px",
    }).componentInstance.stars = stars;
  }
}
