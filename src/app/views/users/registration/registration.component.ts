import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { AppMonitoringService } from "src/app/shared/services/app-monitoring.service";

/**
 * @class
 * @description - It acts as a registration form and will be shows as a dialog.
 */
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild("formEl") formData: NgForm;
  hidePasswordValue = true;
  isDataFetching = false;
  authServiceSubscription = new Subscription();
  appMonitoringServiceSubscription = new Subscription();

  /**
   * @constructor
   * @param usersService
   * @param appMonitoringService
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    private usersService: UsersService,
    private appMonitoringService: AppMonitoringService,
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @method
   * @description - It initializes the component by subscribing the component's variables to corresponding services.
   */
  ngOnInit(): void {
    this.isDataFetching = this.appMonitoringService.getIsDataFetchingStatus();
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetchingSbj.subscribe({
        next: (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        },
      });
  }

  /**
   * @method
   * @description - It performs the necessary actions when the component gets destroyed.
   */
  ngOnDestroy(): void {
    this.onClosing();
  }

  /**
   * @method
   * @description - It performs all necessary action when the user enters valid user credentials and submits them to login.
   */
  onSubmitForm(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.authServiceSubscription = this.usersService
      .userRegistration(this.formData.value)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.snackBar.open("User registration was successful!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          this.appMonitoringService.setIsDataFetchingStatus(false);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error("Registration error:", error.message);
          this.snackBar.open("Something went wrong! Please try again.", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
  }

  /**
   * @method
   * @description - It performs the necessary actions when the user refuses to login.
   */
  onClickCancel(): void {
    this.onClosing();
    this.dialogRef.close();
  }

  /**
   * @method
   * @description - It performs unsubscribing from all services.
   */
  onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false); // Reset the isDataFetching variable in AppMonitoringService to false.
    this.authServiceSubscription.unsubscribe();
    this.appMonitoringServiceSubscription.unsubscribe();
  }
}
