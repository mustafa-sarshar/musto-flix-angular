import { NgModule } from "@angular/core";

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";

const MaterialComponents = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSnackBarModule,
  MatIconModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class AppMaterialModule {}
