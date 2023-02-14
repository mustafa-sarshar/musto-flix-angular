import { Component } from "@angular/core";

import { Actor } from "src/app/shared/models";

@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrls: ["./stars.component.scss"],
})
export class StarsComponent {
  stars: Actor[] = [];

  constructor() {}
}
