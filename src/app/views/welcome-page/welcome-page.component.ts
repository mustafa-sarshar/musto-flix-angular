import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../users/login/login.component";
import { RegistrationComponent } from "../users/registration/registration.component";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    localStorage.clear();
    this.authService.user = new User("", null, null, null, null, null);
  }

  onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: "80%",
      minWidth: "250px",
      maxWidth: "480px",
    });
  }

  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, {
      width: "80%",
      minWidth: "250px",
      maxWidth: "480px",
    });
  }
}
