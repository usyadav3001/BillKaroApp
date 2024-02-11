import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUnitComponent {
  constructor(
    public dialogRef: MatDialogRef<AddUnitComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private adminService: AdminService, private globals: Globals) {
  }
  isAllDataLoaded = {
    unitSaved: true,
  }
  get isProgressBarVisible() {
    let result = false;
    for (const key in this.isAllDataLoaded) {
      if (!this.isAllDataLoaded[key]) {
        result = true;
        break;
      }
    }
    return result;
  }
  progressBarJsonDef = { displayAtTop: true };
  lblHeader = "Add Unit";
  id = "";
  unitName = "";
  price = 0;
  unit = 0;

  ngOnInit(): void {
    if (this.data) {
      this.lblHeader = "Update Unit";
      this.unitName = this.data.UnitName;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const formData = { UnitName: this.unitName, CompanyCode: this.globals.companyCode };
    let type = "addUnit";
    if (this.data) {
      type = "updateUnit";
      formData["Id"] = this.data.Id;
      formData["UpdatedBy"] = this.globals.userDetail.userFullName;
    }
    else {
      formData["CreatedBy"] = this.globals.userDetail.userFullName;
    }
    this.isAllDataLoaded.unitSaved = false;
    this.adminService[type]({ body: formData }).subscribe((res: any) => {
      this.isAllDataLoaded.unitSaved = true;
      if (res.Status == "Success") {
        let action = "addUnit_addNewUnitData";
        if (this.data) {
          action = "addUnit_updateNewUnitData";
          this.dialogRef.close();
        }
        this.adminService.invokeExecuteAction({ action: action, data: res.Data[0] });
        this.resetForm();
      }
    },
      (err) => {
        this.isAllDataLoaded.unitSaved = true;
      });
  }

  resetForm() {
    this.unitName = "";
    this.price = 0;
    this.unit = 0;
  }
}
