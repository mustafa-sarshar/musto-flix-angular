import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "src/app/shared/services/auth.service";
import { UsersService } from "src/app/shared/services/users.service";
import { CanDeactivateComponent } from "src/app/shared/guards/leave-page.guard";

import { User, UserUpdateCredentials } from "src/app/shared/models/user.model";

import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { DialogBox } from "src/app/shared/models/dialog.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, CanDeactivateComponent {
  inputData = new User("", null, null, null, null, null);
  hidePasswordValue = true;
  username = "";
  errorMessage = "";
  changesSaved = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        console.log("UserProfile:", data);
        if (data) {
          this.username = data["user"].username;
          this.inputData.username = data["user"].username;
          this.inputData.email = data["user"].email;
          this.inputData.birth = data["user"].birth.toString().slice(0, 10);
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
      // const dialogRef = (this.dialog.open(ConfirmationDialogComponent, {
      //   width: "250px",
      //   minWidth: "250px",
      //   maxWidth: "480px",
      // }).componentInstance.dialogBox = new DialogBox(
      //   "Be careful!",
      //   "If you leave the page now, you will discard the changes!"
      // ));
      // console.log("Dialog Res:", dialogRef);

      return confirm(
        "If you leave the page now, you will discard the changes!"
      );
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
          this.authService.user = this.inputData;
          localStorage.setItem("username", this.inputData.username);
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
