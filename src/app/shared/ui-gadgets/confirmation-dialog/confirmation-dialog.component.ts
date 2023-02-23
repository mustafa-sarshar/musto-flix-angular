import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { DialogBox } from "src/app/shared/models/dialog.model";

/**
 * @class
 * @description - It acts as a popup dialog for interacting with user.
 */
@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent {
  dialogBox = new DialogBox("", "");
  dialogType: "OK/CANCEL" | "YES/NO" = "OK/CANCEL";

  /**
   * @constructor
   * @param dialogRef
   */
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onClickDecline(): void {
    this.dialogRef.close(false);
  }

  onClickAccept(): void {
    this.dialogRef.close(true);
  }
}
