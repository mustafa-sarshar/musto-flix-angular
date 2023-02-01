import { Component, OnInit } from "@angular/core";

import { ApiService } from "src/app/services/api.service";
import { Director, Movie } from "src/models";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.apiService.getMoviesAll().subscribe((data: any) => {
      this.movies = data;
      console.log("Movies fetched:", this.movies);
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
}
