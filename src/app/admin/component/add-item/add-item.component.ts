import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService, private globals: Globals) {
  }
  isAllDataLoaded = {
    itemSaved: true,
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
  lblHeader = "Add Item";
  id = "";
  itemName = "";
  price = 0;
  unit = 0;
  ddlSelectedUnitOptionId;

  ngOnInit(): void {
    if (this.data.type == 'update') {
      this.lblHeader = "Update Item";
      this.id = this.data.Id;
      this.itemName = this.data.ItemName;
      this.price = this.data.Price;
      this.ddlSelectedUnitOptionId = this.data.UnitId;
      this.unit = this.data.Unit;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const formData = { ItemName: this.itemName, Price: this.price.toString(), UnitId: this.ddlSelectedUnitOptionId, CompanyCode: this.globals.companyCode };
    let type = "addItem";
    if (this.data.type == 'update') {
      type = "updateItem";
      formData["Id"] = this.data.Id;
      formData["UpdatedBy"] = this.globals.userDetail.userFullName;
    }
    else {
      formData["CreatedBy"] = this.globals.userDetail.userFullName;
    }
    this.isAllDataLoaded.itemSaved = false;
    this.adminService[type]({ body: formData }).subscribe((res: any) => {
      this.isAllDataLoaded.itemSaved = true;
      if (res.Status == "Success") {
        let action = "addItem_addNewItemData";
        if (this.data.type == 'update') {
          action = "addItem_updateNewItemData";
          this.dialogRef.close();
        }
        this.adminService.invokeExecuteAction({ action: action, data: res.Data[0] });
        this.resetForm();
      }
    },
      (err) => {
        this.isAllDataLoaded.itemSaved = true;
      });
  }

  resetForm() {
    this.itemName = "";
    this.price = 0;
    this.unit = 0;
  }
}
