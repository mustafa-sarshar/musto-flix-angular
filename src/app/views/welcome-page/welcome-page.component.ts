import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../users/login/login.component";
import { RegistrationComponent } from "../users/registration/registration.component";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: "80%",
      minWidth: "250px",
      maxWidth: "480px",
      disableClose: true,
    });
  }

  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, {
      width: "80%",
      minWidth: "250px",
      maxWidth: "480px",
      disableClose: true,
    });
  }
}
