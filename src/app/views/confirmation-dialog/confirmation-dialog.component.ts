import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { DialogBox } from "src/app/shared/models/dialog.model";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  dialogBox = new DialogBox("", "");
  answer = false;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
    // dialogRef.beforeClosed().subscribe(() => dialogRef.close(this.answer));
  }

  ngOnInit(): void {}

  ngOnDestroy(): boolean {
    return this.answer;
  }

  onClickCancel(): void {
    console.log("Cancel");
    this.answer = false;
    this.dialogRef.close();
  }

  onClickOk(): void {
    console.log("Ok");
    this.answer = true;
    this.dialogRef.close();
  }
}
