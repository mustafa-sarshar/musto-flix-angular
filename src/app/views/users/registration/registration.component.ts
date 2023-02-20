import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { AppMonitoringService } from "src/app/shared/services/app-monitoring.service";

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

  constructor(
    private usersService: UsersService,
    private appMonitoringService: AppMonitoringService,
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private snackBar: MatSnackBar
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

  ngOnDestroy(): void {
    this.onClosing();
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
