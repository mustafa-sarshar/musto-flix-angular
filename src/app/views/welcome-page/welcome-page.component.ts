import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../users/login/login.component";
import { RegistrationComponent } from "../users/registration/registration.component";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent {
  constructor(private dialog: MatDialog) {}

  onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, { width: "480px" });
  }

  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, { width: "480px" });
  }
}
