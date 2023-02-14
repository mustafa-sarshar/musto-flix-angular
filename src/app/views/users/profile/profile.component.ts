import { Component, Input, OnInit } from "@angular/core";
import { Router, UrlTree } from "@angular/router";

import { Dialog } from "@angular/cdk/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { CanDeactivateComponent } from "src/app/shared/guards/leave-page.guard";

import { UserUpdateCredentials } from "src/app/shared/models";
import { Observable } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, CanDeactivateComponent {
  @Input() inputData = new UserUpdateCredentials("", "", "", "");
  hidePasswordValue = true;
  username = "";
  errorMessage = "";
  changesSaved = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    public dialog: Dialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUser().subscribe(
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

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.changesSaved) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
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
      this.usersService.updateUser(this.inputData).subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open("User profile data updated successfully!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          localStorage.setItem("username", this.inputData.username);
          this.authService.username = this.inputData.username;
          this.changesSaved = true;
          this.router.navigate(["/movies"]);
        },
        (error) => {
          console.error("Update user profile error:", error.message);
          this.errorMessage = error.message;
          this.snackBar.open("Something went wrong! Please try again!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
          this.changesSaved = false;
        }
      );
    }
  }

  onClickDeleteAccount(): void {
    console.log("onClickDeleteAccount");
    if (this.username) {
      this.usersService.deleteUser().subscribe(
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
