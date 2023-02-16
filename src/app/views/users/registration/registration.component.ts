import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  @ViewChild("formEl") formData: NgForm;
  hidePasswordValue = true;
  isDataFetchingNow = false;
  serviceSubscription = new Subscription();

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmitForm(): void {
    this.isDataFetchingNow = true;
    this.serviceSubscription = this.usersService
      .userRegistration(this.formData.value)
      .subscribe(
        (result) => {
          console.log(result);
          this.snackBar.open("User registration was successful!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          this.serviceSubscription.unsubscribe();
          this.dialogRef.close();
        },
        (error) => {
          console.error("Registration error:", error.message);
          this.snackBar.open("Something went wrong! Please try again.", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
          this.isDataFetchingNow = false;
        }
      );
  }

  onClickCancel(): void {
    this.isDataFetchingNow = false;
    this.serviceSubscription.unsubscribe();
    this.dialogRef.close();
  }
}
