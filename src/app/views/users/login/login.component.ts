import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Data, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "src/app/shared/services/auth.service";
import { AppMonitoringService } from "src/app/shared/services/app-monitoring.service";

/**
 * @class
 * @description - It acts as a login form and will be shows as a dialog.
 */
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("formEl") formData: NgForm;
  hidePasswordValue = true;
  isDataFetching = false;
  authServiceSubscription = new Subscription();
  appMonitoringServiceSubscription = new Subscription();

  /**
   * @constructor
   * @param authService
   * @param appMonitoringService
   * @param dialogRef
   * @param snackBar
   * @param router
   */
  constructor(
    private authService: AuthService,
    private appMonitoringService: AppMonitoringService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDataFetching = this.appMonitoringService.getIsDataFetchingStatus();
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetchingSbj.subscribe({
        next: (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        },
      });
  }

  ngOnDestroy(): void {
    this.onClosing();
  }

  onSubmitForm(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.authServiceSubscription = this.authService
      .userLogin(this.formData.value)
      .subscribe({
        next: (result: Data) => {
          localStorage.clear();
          localStorage.setItem("username", result["user"].username);
          localStorage.setItem("favorites", result["user"].favList.toString());
          localStorage.setItem("token", result["token"]);
          this.dialogRef.close();
          this.snackBar.open("User login was successful!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          this.router.navigate(["movies"]);
        },
        error: (error) => {
          this.snackBar.open("Something went wrong! Please try again.", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
          console.error(error.message);
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
  }

  onClickCancel(): void {
    this.onClosing();
    this.dialogRef.close();
  }

  onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.authServiceSubscription.unsubscribe();
    this.appMonitoringServiceSubscription.unsubscribe();
  }
}
