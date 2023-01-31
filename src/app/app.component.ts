import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RegistrationComponent } from "./users/registration/registration.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, { width: "480px" });
  }
}
