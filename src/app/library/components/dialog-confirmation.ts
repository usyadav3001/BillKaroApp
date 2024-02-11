import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-confirmation',
  template: `
    <div class="dialog-container">
    <div class="confirm_icon">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="19" viewBox="0 0 40 40">
        <path fill="#fff" stroke="#4788c7" stroke-miterlimit="10" d="M1.707,22.199l2.779-2.779l8.876,8.877L35.514,6.145	l2.779,2.779L13.362,33.855L1.707,22.199z"></path>
        </svg>
    </div>
    <div class="confirm_msg"><h2 mat-dialog-title>{{data.confirmationDialog.dialogtitle}}</h2>
    <p mat-dialog-content>{{data.confirmationDialog.dialogmessage}}</p>
    <div mat-dialog-actions>
        <button mat-button *ngIf="getFocusedValue(data.confirmationDialog.dialogfalsebuttonname)"
        class='button delete_no button-color'
        [mat-dialog-close]="false" cdkFocusInitial>
          {{data.confirmationDialog.dialogfalsebuttonname}}
        </button>
        <button *ngIf="!(getFocusedValue(data.confirmationDialog.dialogtruebuttonname))" mat-button class='button delete_yes'
          [mat-dialog-close]="true">
          {{data.confirmationDialog.dialogtruebuttonname}}
        </button>
    </div>
    </div>
</div>
<style>
.confirm_icon {
  width: 75px;
  line-height: 5px;
  vertical-align: middle;
  display: inline-block;
  margin: 0 0 0 -1px;
  text-align: center;
  padding: 54px 0px;
  border-radius: 3px 0 0 3px;
  background: #856EC6;
}

.confirm_msg {
  vertical-align: middle;
  display: inline-block;
  padding-left: 15px;
  padding-right: 15px;
}
.mat-mdc-dialog-title{
    font-size: 17px;
    padding: 0px 15px;
    line-height: normal;
    margin: 0; 
}
.mat-mdc-dialog-content{
    padding: 0px 15px;
    line-height: normal;
    margin: 0;  
}
.mat-mdc-dialog-actions{
    justify-content: end;
    margin-top: 10px;
}
.delete_no{
    color: #856EC6 !important;
}
    </style>`,
})
export class DialogConfirmationComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
  }

  getFocusedButtonName() {
    return this.data.focusedButton;
  }

  getFocusedValue(value:any) {
    return this.getFocusedButtonName() === value;
  }
}
