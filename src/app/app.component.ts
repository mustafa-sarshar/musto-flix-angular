import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  onOpenMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: "500px",
    });
  }
}
