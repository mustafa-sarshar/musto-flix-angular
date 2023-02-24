import { Component } from "@angular/core";

import { Genre } from "src/app/shared/models/movie.model";

/**
 * @class
 * @description - It holds/shows the data of one specific genre.
 */
@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.scss"],
})
export class GenresComponent {
  /**
   * @property
   */
  genres: Genre[] = [];

  constructor() {}
}
