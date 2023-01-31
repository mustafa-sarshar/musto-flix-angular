import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RegistrationComponent } from "./users/registration/registration.component";
import { LoginComponent } from "./users/login/login.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, { width: "480px" });
  }

  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, { width: "480px" });
  }
}
