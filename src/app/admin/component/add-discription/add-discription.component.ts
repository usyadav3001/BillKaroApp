import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-add-discription',
  templateUrl: './add-discription.component.html',
  styleUrls: ['./add-discription.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiscriptionComponent {
  constructor(
    public dialogRef: MatDialogRef<AddDiscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private adminService: AdminService, private globals: Globals) {
  }

  lblHeader = "Add Discription";
  txtDescription = "";

  ngOnInit(): void {
    if (this.data.action == 'update') {
      this.lblHeader = "Update Discription";
    }
    this.txtDescription = this.data?.description;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.txtDescription);
  }

  resetForm() {
  }
}
