import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "src/app/shared/services/users.service";
import { AppMonitoringService } from "src/app/shared/services/app-monitoring.service";
import { CanDeactivateComponent } from "src/app/shared/guards/leave-page.guard";

import { UserUpdateCredentials } from "src/app/shared/models/user.model";

import { ConfirmationDialogComponent } from "../../../shared/ui-gadgets/confirmation-dialog/confirmation-dialog.component";
import { DialogBox } from "src/app/shared/models/dialog.model";

import { CONFIRMATION_POPUP_STYLE } from "src/configs";

/**
 * @class
 * @description - It holds all the user's profile information, and allows the user's to delete the account or update the user's profile data.
 */
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent
  implements OnInit, OnDestroy, CanDeactivateComponent
{
  userData = new UserUpdateCredentials(null, null, null, null);
  @ViewChild("formEl") dataForm: NgForm;
  hidePasswordValue = true;
  errorMessage = "";
  changesSaved = true;
  isDataFetching = true;
  userServiceSubscription = new Subscription();
  appMonitoringServiceSubscription = new Subscription();

  /**
   * @constructor
   * @param usersService
   * @param appMonitoringService
   * @param dialog
   * @param snackBar
   * @param router
   */
  constructor(
    private usersService: UsersService,
    private appMonitoringService: AppMonitoringService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @method
   * @description - It initializes the component by subscribing the component's variables to corresponding services.
   */
  ngOnInit(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.isDataFetching = this.appMonitoringService.getIsDataFetchingStatus();
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetchingSbj.subscribe({
        next: (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        },
      });
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
        this.appMonitoringService.setIsDataFetchingStatus(false);
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
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }

  /**
   * @method
   * @description - It performs the necessary actions when the component gets destroyed.
   */
  ngOnDestroy(): void {
    this.onClosing();
  }

  /**
   * @method
   * @description - It will first check the change status of the input data and then ask the user for confirmation before leaving the page, if the input data is already changed but not saved.
   * @returns
   */
  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.changesSaved) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.dialogBox = new DialogBox(
        "Be careful!",
        "If you leave the page now, you will discard the changes!"
      );
      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

  /**
   * @method
   * @description - It will return a user object by checking the validity of each input data.
   * @returns - the updated user's data
   */
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

  /**
   * @method
   * @description - It checks the validity of all input data.
   * @returns - true/false based on the validation of the input data
   */
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

  /**
   * @method
   * @description - It checks weather the user has entered any data in any of input fields, and update the changesSaved variable based on that.
   */
  onChangeInput(): void {
    const dataInput = this.dataForm.value;
    this.changesSaved = true;

    console.log("DataInput", dataInput);

    if (
      dataInput?.username.trim().length > 0 &&
      dataInput?.username !== this.userData.username
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

  /**
   * @method
   * @description - It performs all necessary action when the user enters valid user credentials and submits them to login.
   */
  onSubmitForm(): void {
    if (this.allowSubmitForm()) {
      this.appMonitoringService.setIsDataFetchingStatus(true);

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
          this.onClosing();
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
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
    }
  }

  /**
   * @method
   * @description - It check the  all necessary action when the user enters valid user credentials and submits them to login.
   */
  onClickDeleteAccount(): void {
    if (this.userData.username) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
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
              this.onClosing();
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

  /**
   * @method
   * @description - It clears resets the form's input fields.
   */
  onClickClear(): void {
    this.changesSaved = true;
    this.dataForm.resetForm({
      username: "",
      pass: "",
      email: "",
      birth: "",
    });
    console.log(this.dataForm);
  }

  /**
   * @method
   * @description - It performs unsubscribing from all services.
   */
  onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false); // Reset the isDataFetching variable in AppMonitoringService to false.
    this.userServiceSubscription.unsubscribe();
    this.appMonitoringServiceSubscription.unsubscribe();
  }
}
