import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../users/login/login.component";
import { RegistrationComponent } from "../users/registration/registration.component";

import { LOGIN_SIGNUP_FORM_STYLE } from "src/configs";

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
    this.dialog.open(LoginComponent, LOGIN_SIGNUP_FORM_STYLE);
  }

  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, LOGIN_SIGNUP_FORM_STYLE);
  }
}
