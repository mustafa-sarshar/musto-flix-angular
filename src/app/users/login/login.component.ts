import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "src/app/services/api.service";
import { UserLoginCredentials } from "src/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @Input() inputData = new UserLoginCredentials("", "");

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public snackBar: MatSnackBar
  ) {}

  onSubmitForm() {
    this.apiService.userLogin(this.inputData).subscribe(
      (results) => {
        console.log(results);
        this.dialogRef.close();
        this.snackBar.open("User login was successful!", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar", "login-snackbar"],
        });
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
}
