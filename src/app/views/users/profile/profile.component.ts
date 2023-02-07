import { Component, Input, OnInit } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { ApiService } from "src/app/services/api.service";
import { checkIsTokenExpired } from "src/app/utils";
import { UserUpdateCredentials } from "src/models";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  @Input() inputData = new UserUpdateCredentials("", "", "", "");
  hidePasswordValue = true;
  username = "";
  errorMessage = "";

  constructor(
    private apiService: ApiService,
    public dialog: Dialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (checkIsTokenExpired()) {
      this.router.navigate(["/welcome"]);
    } else {
      this.apiService.getUser().subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.username = response.username;
            this.inputData.username = response.username;
            this.inputData.pass = "";
            this.inputData.email = response.email;
            this.inputData.birth = response.birth.toString().slice(0, 10);
          }
          this.snackBar.open("User profile data fetched successfully!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
        },
        (error) => {
          console.error("Profile error:", error);
          this.snackBar.open(
            "Something went wrong! User's profile data couldn't get fetched.",
            "OK",
            {
              duration: 2000,
              panelClass: ["red-snackbar", "login-snackbar"],
            }
          );
        }
      );
    }
  }

  getDataUpdate(): UserUpdateCredentials {
    const dataUpdate = new UserUpdateCredentials(null, null, null, null);
    if (this.username !== this.inputData.username)
      dataUpdate.username = this.inputData.username;

    dataUpdate.pass = this.inputData.pass;
    dataUpdate.email = this.inputData.email;
    dataUpdate.birth = this.inputData.birth;

    return dataUpdate;
  }

  onClickUpdateUserProfile(): void {
    console.log("onClickUpdateUserProfile");
    if (this.username) {
      const dataUpdate = this.getDataUpdate();
      console.log("dataUpdate:", dataUpdate);
      this.apiService.updateUser(this.inputData).subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open("User profile data updated successfully!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          localStorage.setItem("username", this.inputData.username);
          this.router.navigate(["/movies"]);
        },
        (error) => {
          console.error("Update user profile error:", error.message);
          this.errorMessage = error.message;
          this.snackBar.open("Something went wrong! Please try again!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        }
      );
    }
  }

  onClickDeleteAccount(): void {
    console.log("onClickDeleteAccount");
    if (this.username) {
      this.apiService.deleteUser().subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open("User profile deleted successfully!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          this.router.navigate(["/welcome"]);
        },
        (error) => {
          console.error(error.message);
          this.snackBar.open("Something went wrong! Please try again!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
        }
      );
    }
  }
}
