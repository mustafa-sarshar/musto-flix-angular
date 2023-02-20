import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { CanDeactivateComponent } from "src/app/shared/guards/leave-page.guard";

import { UserUpdateCredentials } from "src/app/shared/models/user.model";

import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { DialogBox } from "src/app/shared/models/dialog.model";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit, CanDeactivateComponent {
  userData = new UserUpdateCredentials(null, null, null, null);
  @ViewChild("formEl") dataForm: NgForm;
  hidePasswordValue = true;
  errorMessage = "";
  changesSaved = true;
  isDataFetchingNow = false;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUser().subscribe({
      next: (response) => {
        console.log("UserProfile:", response);
        if (response) {
          this.userData.username = response.username;
          this.userData.email = response.email;
          this.userData.birth = response.birth.toString().slice(0, 10);
        }
        this.snackBar.open("User profile data fetched successfully!", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar", "login-snackbar"],
        });
      },
      error: (error) => {
        console.error("Profile error:", error);
        this.snackBar.open(
          "Something went wrong! User's profile data couldn't get fetched.",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          }
        );
      },
    });
  }

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.changesSaved) {
      // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      //   width: "250px",
      //   minWidth: "250px",
      //   maxWidth: "480px",
      // });
      // dialogRef.componentInstance.dialogBox = new DialogBox(
      //   "Be careful!",
      //   "If you leave the page now, you will discard the changes!"
      // );
      // dialogRef.afterClosed().subscribe((answer) => {
      //   console.log("answer:", answer);
      // });
      return confirm(
        "If you leave the page now, you will discard the changes!"
      );
    } else {
      return true;
    }
  }

  getDataUpdate(): UserUpdateCredentials {
    const dataUpdate = new UserUpdateCredentials(null, null, null, null);
    if (
      this.dataForm.controls["username"].touched &&
      this.dataForm.controls["username"].dirty
    ) {
      dataUpdate.username = this.dataForm.controls["username"].value.trim();
    }
    if (
      this.dataForm.controls["pass"].touched &&
      this.dataForm.controls["pass"].dirty
    ) {
      dataUpdate.pass = this.dataForm.controls["pass"].value.trim();
    }
    if (
      this.dataForm.controls["email"].touched &&
      this.dataForm.controls["email"].dirty
    ) {
      dataUpdate.email = this.dataForm.controls["email"].value.trim();
    }
    if (
      this.dataForm.controls["birth"].touched &&
      this.dataForm.controls["birth"].dirty
    ) {
      dataUpdate.birth = this.dataForm.controls["birth"].value.trim();
    }
    return dataUpdate;
  }

  allowSubmitForm(): boolean {
    if (this.dataForm) {
      const dataFormValues = this.dataForm.value;

      if (
        this.dataForm.valid &&
        this.dataForm.touched &&
        this.dataForm.dirty &&
        (dataFormValues.username.trim().length >= 5 ||
          dataFormValues.pass.trim().length >= 5 ||
          dataFormValues.email.trim().length > 0 ||
          dataFormValues.birth.trim().length > 0)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onChangeInput(): void {
    const dataInput = this.dataForm.value;
    this.changesSaved = true;

    if (
      dataInput.username.trim().length > 0 &&
      dataInput.username !== this.userData.username
    ) {
      console.log("Username changed!");
      this.changesSaved = false;
    }

    if (dataInput.pass.trim().length > 0) {
      console.log("Password changed!");
      this.changesSaved = false;
    }

    if (
      dataInput.email.trim().length > 0 &&
      dataInput.email !== this.userData.email
    ) {
      console.log("Email changed!");
      this.changesSaved = false;
    }

    if (
      dataInput.birth.trim().length > 0 &&
      dataInput.birth !== this.userData.birth
    ) {
      console.log(dataInput.birth, this.userData.birth);
      console.log("Birth date changed!");
      this.changesSaved = false;
    }
  }

  onSubmitForm(): void {
    if (this.allowSubmitForm()) {
      const dataFormValues = this.dataForm.value;
      const dataUpdate = this.getDataUpdate();
      console.log("dataUpdate:", dataUpdate);
      this.usersService.updateUser(dataUpdate).subscribe({
        next: (response) => {
          console.log(response);
          this.snackBar.open("User profile data updated successfully!", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar", "login-snackbar"],
          });
          if (dataFormValues.username.trim().length >= 5) {
            localStorage.setItem("username", dataFormValues.username);
          }
          this.changesSaved = true;
          this.router.navigate(["/movies"]);
        },
        error: (error) => {
          console.error("Update user profile error:", error.message);
          this.errorMessage = error.message;
          this.snackBar.open("Something went wrong! Please try again!", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar", "login-snackbar"],
          });
          this.changesSaved = false;
        },
      });
    }
  }

  onClickDeleteAccount(): void {
    if (this.userData.username) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "250px",
        minWidth: "250px",
        maxWidth: "480px",
      });
      dialogRef.componentInstance.dialogBox = new DialogBox(
        "Be careful!",
        "Do you really want to delete your account?"
      );
      dialogRef.componentInstance.dialogType = "YES/NO";
      dialogRef.afterClosed().subscribe((answer) => {
        if (answer) {
          this.usersService.deleteUser().subscribe({
            next: (response) => {
              console.log(response);
              this.snackBar.open("User profile deleted successfully!", "OK", {
                duration: 2000,
                panelClass: ["green-snackbar", "login-snackbar"],
              });
              this.router.navigate(["/welcome"]);
            },
            error: (error) => {
              console.error(error.message);
              this.snackBar.open(
                "Something went wrong! Please try again!",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["red-snackbar", "login-snackbar"],
                }
              );
            },
          });
        }
      });
    }
  }
}
