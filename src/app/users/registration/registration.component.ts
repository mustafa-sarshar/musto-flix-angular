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

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<RegistrationComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmitForm(): void {
    this.apiService.userRegistration(this.inputData).subscribe(
      (results) => {
        console.log(results);
        this.dialogRef.close();
        this.snackBar.open("User registration was successful!", "OK", {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open("Something went wrong! Please try again.", "OK", {
          duration: 2000,
        });
        console.error(error);
      }
    );
  }
}
