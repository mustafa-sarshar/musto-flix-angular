import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "src/app/shared/services/auth.service";
import { UserLoginCredentials } from "src/app/shared/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @Input() inputData = new UserLoginCredentials("", "");
  hidePasswordValue = true;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmitForm() {
    this.authService.userLogin(this.inputData).subscribe(
      (result) => {
        localStorage.clear();
        this.authService.username = result.user.username;
        localStorage.setItem("username", result.user.username);
        localStorage.setItem("favorites", result.user.favList.toString());
        localStorage.setItem("token", result.token);
        this.dialogRef.close();
        this.snackBar.open("User login was successful!", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar", "login-snackbar"],
        });
        this.router.navigate(["movies"]);
      },
      (error) => {
        this.snackBar.open("Something went wrong! Please try again.", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar", "login-snackbar"],
        });
        console.error(error.message);
      }
    );
  }

  onClickCancel(): void {
    this.authService.username = "";
    this.dialogRef.close();
  }
}
