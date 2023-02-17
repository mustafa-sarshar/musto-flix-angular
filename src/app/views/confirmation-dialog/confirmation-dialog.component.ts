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
  dialogType: "OK/CANCEL" | "YES/NO" = "OK/CANCEL";

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {}

  onClickDecline(): void {
    console.log("Declined");
    this.dialogRef.close(false);
  }

  onClickAccept(): void {
    console.log("Accepted");
    this.dialogRef.close(true);
  }
}
