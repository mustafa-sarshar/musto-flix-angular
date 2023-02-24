import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../users/login/login.component";
import { RegistrationComponent } from "../users/registration/registration.component";

import { LocalStorageService } from "src/app/shared/services/local-storage.service";

import { LOGIN_SIGNUP_FORM_STYLE } from "src/configs";

/**
 * @class
 * @description - This is the landing page of the app, which provides the users which two choices, 1) to login, and 2) to register.
 */
@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  /**
   * @constructor
   * @param dialog - It will be used to open a dialog holding the corresponding UI component.
   */
  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * @method
   * @description - It initializes and resets the app when the app first starts or the user logs out.
   */
  ngOnInit(): void {
    this.localStorageService.clearLocalStorage();
  }

  /**
   * @method
   * @description - It opens the LoginComponent as a dialog for login purpose.
   */
  onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, LOGIN_SIGNUP_FORM_STYLE);
  }

  /**
   * @method
   * @description - It opens the RegistrationComponent as a dialog for registration purpose.
   */
  onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, LOGIN_SIGNUP_FORM_STYLE);
  }
}
