import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfirmDialog } from "./commonmodel";
import { DialogConfirmationComponent } from "../components/dialog-confirmation";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CommonFunctions {
    constructor( public dialog: MatDialog,){

    }
showConfirmationDialog(
    dialogTitle: string, dialogMessage: string,configuration = {}, focusedButtonName = '') {
    const cond = new ConfirmDialog();
    cond.dialogtitle = dialogTitle;
    cond.dialogmessage = dialogMessage;
    cond.dialogfalsebuttonname =focusedButtonName= 'No';
    cond.dialogtruebuttonname = 'Yes';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 240;//to confirm
    dialogConfig.data = {
      id: 1,
      confirmationDialog: cond,
      configuration: configuration,
      focusedButton: focusedButtonName
    };
    const dialogRef = this.dialog.open(DialogConfirmationComponent, dialogConfig);
    return dialogRef;
  }
}