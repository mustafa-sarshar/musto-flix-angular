import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { MoviesService } from "src/app/shared/services/movies.service";

import { DirectorsComponent } from "../directors/directors.component";
import { GenresComponent } from "../genres/genres.component";
import { StarsComponent } from "../stars/stars.component";

import { Actor, Director, Genre, Movie } from "src/app/shared/models";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  favorites: string[] = [];

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.favorites = localStorage.getItem("favorites").split(",");
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getMoviesAll().subscribe((data: any) => {
      this.movies = data;
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
      this.usersService.removeFavoriteMovieFromServer(movieId).subscribe(
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
      this.usersService.addFavoriteMovieToServer(movieId).subscribe(
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
