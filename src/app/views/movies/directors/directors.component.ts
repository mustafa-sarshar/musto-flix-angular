import { Component } from "@angular/core";

import { Director } from "src/app/shared/models";

@Component({
  selector: "app-directors",
  templateUrl: "./directors.component.html",
  styleUrls: ["./directors.component.scss"],
})
export class DirectorsComponent {
  directors: Director[] = [];

  constructor() {}
}
