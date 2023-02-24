import { Component } from "@angular/core";

import { Director } from "src/app/shared/models/movie.model";

/**
 * @class
 * @description - It holds/shows the data of one specific director.
 */
@Component({
  selector: "app-directors",
  templateUrl: "./directors.component.html",
  styleUrls: ["./directors.component.scss"],
})
export class DirectorsComponent {
  /**
   * @property
   */
  directors: Director[] = [];

  constructor() {}
}
