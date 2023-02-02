import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { UserLoginCredentials } from "src/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @Input() inputData = new UserLoginCredentials("", "");
  hidePasswordValue = true;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmitForm() {
    this.apiService.userLogin(this.inputData).subscribe(
      (result) => {
        console.log(result);
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
        console.error(error);
      }
    );
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }
}
