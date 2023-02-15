import { Component } from "@angular/core";

import { Genre } from "src/app/shared/models/movie.model";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.scss"],
})
export class GenresComponent {
  genres: Genre[] = [];

  constructor() {}
}
