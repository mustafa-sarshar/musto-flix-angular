import { Component, ViewChild } from "@angular/core";
import { Data, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @ViewChild("formEl") formData: NgForm;
  hidePasswordValue = true;
  isDataFetchingNow = false;
  serviceSubscription = new Subscription();

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmitForm(): void {
    this.isDataFetchingNow = true;
    this.serviceSubscription = this.authService
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
          this.serviceSubscription.unsubscribe();
          this.router.navigate(["movies"]);
        },
        error: (error) => {
          this.snackBar.open("Something went wrong! Please try again.", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
          console.error(error.message);
          this.isDataFetchingNow = false;
        },
      });
  }

  onClickCancel(): void {
    this.isDataFetchingNow = false;
    this.serviceSubscription.unsubscribe();
    this.dialogRef.close();
  }
}
