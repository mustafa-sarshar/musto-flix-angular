import { Component, Input } from "@angular/core";
import { Data, Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "src/app/shared/services/auth.service";

import { User, UserLoginCredentials } from "src/app/shared/models/user.model";

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
      (result: Data) => {
        localStorage.clear();
        const userFetched = new User(
          result["user"]._id,
          result["user"].username,
          "",
          result["user"].email,
          result["user"].birth,
          result["user"].favList
        );
        this.authService.user = userFetched;
        localStorage.setItem("username", userFetched.username);
        localStorage.setItem("favorites", userFetched.favList.toString());
        localStorage.setItem("token", result["token"]);
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
    this.authService.user = new User("", null, null, null, null, null);
    this.dialogRef.close();
  }
}
