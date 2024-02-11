import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-employee',
  templateUrl: './add-or-edit-employee.component.html',
  styleUrls: ['./add-or-edit-employee.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AddOrEditEmployeeComponent {
  lblHeaderData:string='Add New Employee';
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
 constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<AddOrEditEmployeeComponent>) {}

  addOrUpdateEmpform: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email:new FormControl('', [Validators.required,Validators.email]),
    dob:new FormControl(),
    gender:new FormControl('', [Validators.required]),
    education:new FormControl(),
    salary:new FormControl('', [Validators.required]),
    dateOfJoin:new FormControl('', [Validators.required]),
    mobileNo:new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.lblHeaderData=this.data?'Update Employee':'Add New Employee';
     this.addOrUpdateEmpform.patchValue(this.data);
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.addOrUpdateEmpform.controls[controlName].hasError(errorName);
  }
  onFormSubmit() {
    if (this.addOrUpdateEmpform.valid) {
      if (this.data) {
        //after update data 
        this.dialogRef.close(true); 
      }else{
        //after add data
        this.dialogRef.close(true);
      }
    }
  }
}
