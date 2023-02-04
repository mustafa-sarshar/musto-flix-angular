import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { ApiService } from "src/app/services/api.service";
import { checkIsTokenExpired } from "src/app/utils";

import { DirectorsComponent } from "../directors/directors.component";
import { GenresComponent } from "../genres/genres.component";
import { StarsComponent } from "../stars/stars.component";

import { Actor, Director, Genre, Movie } from "src/models";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  favorites: string[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (checkIsTokenExpired()) {
      this.router.navigate(["/welcome"]);
    } else {
      this.favorites = localStorage.getItem("favorites").split(",");
      this.getMovies();
    }
  }

  getMovies(): void {
    this.apiService.getMoviesAll().subscribe((data: any) => {
      this.movies = data;
      // return this.movies;
    });
  }

  extractDirectors(directors: Director[]): string[] {
    const directorsNames = [];
    directors.forEach((director) => {
      directorsNames.push(director.name);
    });

    return directorsNames;
  }

  checkMovieIsFavorite(movieId: string): boolean {
    if (this.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  onClickToggleFavorite(movieId: string): void {
    if (this.checkMovieIsFavorite(movieId)) {
      console.log("Lets remove it", movieId);
      this.apiService.removeFavoriteMovieFromServer(movieId).subscribe(
        (response) => {
          console.log("Success", response);
          this.removeFavoriteMovieFromLocalStorage(movieId);
          this.snackBar.open("Movie remove from favorites.", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        (error) => {
          console.error("Add to favorites error:", error);
          this.snackBar.open("Something went wrong!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        }
      );
    } else {
      console.log("Lets add it", movieId);
      this.apiService.addFavoriteMovieToServer(movieId).subscribe(
        (response) => {
          console.log("Success", response);
          this.addFavoriteMovieToLocalStorage(movieId);
          this.snackBar.open("Movie added to favorites.", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        (error) => {
          console.error("Add to favorites error:", error);
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
    }
  }

  onClickGenres(genres: Genre[]): void {
    console.log(genres);
    this.dialog.open(GenresComponent, { width: "480px" });
  }

  onClickDirectors(directors: Director[]): void {
    console.log(directors);
    this.dialog.open(DirectorsComponent, { width: "480px" });
  }

  onClickStars(stars: Actor[]): void {
    console.log(stars);
    this.dialog.open(StarsComponent, { width: "480px" });
  }
}
