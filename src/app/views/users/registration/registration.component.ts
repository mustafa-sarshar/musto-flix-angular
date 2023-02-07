import { Component, Input, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "src/app/services/api.service";
import { UserRegistrationCredentials } from "src/models";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  @Input() inputData = new UserRegistrationCredentials("", "", "", "");
  hidePasswordValue = true;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmitForm(): void {
    this.apiService.userRegistration(this.inputData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open("User registration was successful!", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar", "login-snackbar"],
        });
      },
      (error) => {
        console.error("Registration error:", error.message);
        this.snackBar.open("Something went wrong! Please try again.", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar", "login-snackbar"],
        });
      }
    );
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }
}
