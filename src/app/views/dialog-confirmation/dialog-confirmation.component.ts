import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-confirmation",
  templateUrl: "./dialog-confirmation.component.html",
  styleUrls: ["./dialog-confirmation.component.scss"],
})
export class DialogConfirmationComponent {
  @Input() message = "Do you really want to do it?";

  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  onClickCancel(): void {
    this.dialogRef.close();
  }

  onClickYes(): void {}
}
