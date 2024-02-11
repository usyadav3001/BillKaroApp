import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
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
  lblHeader = "Add Customer";
  id = "";
  fullName = "";
  phoneNumber = "";
  email = "";
  address = "";

  ngOnInit(): void {
    if (this.data) {
      if (this.data.type == 'update') {
        this.lblHeader = "Update Customer";
      }
      this.id = this.data.Id;
      this.fullName = this.data.FullName;
      this.phoneNumber = this.data.PhoneNo;
      this.email = this.data.Email;
      this.address = this.data.Address;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const formData = { FullName: this.fullName, PhoneNo: this.phoneNumber.toString(), Email: this.email, Address: this.address, CompanyCode: this.globals.companyCode };
    this.isAllDataLoaded.itemSaved = false;
    let type = "addCustomer";
    if (this.data) {
      type = "updateCustomer";
      formData["Id"] = this.id;
      formData["UpdatedBy"] = this.globals.userDetail.userFullName;
    }
    else {
      formData["CreatedBy"] = this.globals.userDetail.userFullName;
    }
    this.adminService[type]({ body: formData }).subscribe((res: any) => {
      this.isAllDataLoaded.itemSaved = true;
      if (res.Status == "Success") {
        let action = "addCustomer_addCustomerItemData";
        if (this.data) {
          action = "addCustomer_updateNewCustomerData";
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
    this.fullName = "";
    this.phoneNumber = "";
    this.email = "";
    this.address = "";
  }
}
