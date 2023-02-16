import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { DialogBox } from "src/app/shared/models/dialog.model";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit {
  dialogBox = new DialogBox("", "");

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {}

  onClickCancel(): void {
    console.log("Cancel");
    this.dialogRef.close(false);
  }

  onClickOk(): void {
    console.log("Ok");
    this.dialogRef.close(true);
  }
}
