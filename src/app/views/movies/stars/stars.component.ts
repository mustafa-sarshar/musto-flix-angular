import { Component } from "@angular/core";

import { Actor } from "src/app/shared/models/movie.model";

/**
 * @class
 * @description - It holds/shows the data of one specific actor.
 */
@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrls: ["./stars.component.scss"],
})
export class StarsComponent {
  stars: Actor[] = [];

  constructor() {}
}
