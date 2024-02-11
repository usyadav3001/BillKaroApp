import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditEmployeeComponent } from './components/add-or-edit-employee.component';
import { CommonFunctions } from '../../../library/functions/commonfunction';
import { Snackbarservice } from '../../../library/services/snackbar.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesComponent {
  displayedColumns: string[] = [
    'id',
    'Name',
    'email',
    'salary',
    'mobileNo',
    'action',
  ];
  lblHeader = "Manage Employees"
  rowData: any[] = [];
  tableHeight = '';
  constructor(private dialog: MatDialog, private mService: Snackbarservice, private cmf: CommonFunctions) { }

  ngOnInit() {
    this.rowData.push({
      "id": 1,
      "firstName": "Brinn",
      "lastName": "Jephcote",
      "email": "bjephcote0@archive.org",
      "dob": "1981-10-05T12:09:39Z",
      "gender": "female",
      "education": "Graduate",
      "salary": 15000,
      "dateOfJoin": "1981-10-05T12:09:39Z",
      "mobileNo": 9521767688
    },
      {
        "id": 2,
        "firstName": "Ram",
        "lastName": "Yadav",
        "email": "ram009@archive.org",
        "dob": "1981-10-05T12:09:39Z",
        "gender": "male",
        "education": "Graduate",
        "salary": 17000,
        "dateOfJoin": "1981-10-05T12:09:39Z",
        "mobileNo": 9521767688
      },
      {
        "id": 3,
        "firstName": "Brinn",
        "lastName": "Jephcote",
        "email": "bjephcote0@archive.org",
        "dob": "1981-10-05T12:09:39Z",
        "gender": "male",
        "education": "Graduate",
        "salary": 19000,
        "dateOfJoin": "1981-10-05T12:09:39Z",
        "mobileNo": 9521767688
      },
      {
        "id": 5,
        "firstName": "Brinn",
        "lastName": "Jephcote",
        "email": "bjephcote0@archive.org",
        "dob": "1981-10-05T12:09:39Z",
        "gender": "male",
        "education": "Graduate",
        "salary": 19000,
        "dateOfJoin": "1981-10-05T12:09:39Z",
        "mobileNo": 9521767688
      }, {
      "id": 6,
      "firstName": "Brinn",
      "lastName": "Jephcote",
      "email": "bjephcote0@archive.org",
      "dob": "1981-10-05T12:09:39Z",
      "gender": "male",
      "education": "Graduate",
      "salary": 19000,
      "dateOfJoin": "1981-10-05T12:09:39Z",
      "mobileNo": 9521767688
    }, {
      "id": 7,
      "firstName": "Brinn",
      "lastName": "Jephcote",
      "email": "bjephcote0@archive.org",
      "dob": "1981-10-05T12:09:39Z",
      "gender": "male",
      "education": "Graduate",
      "salary": 19000,
      "dateOfJoin": "1981-10-05T12:09:39Z",
      "mobileNo": 9521767688
    })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableHeight = (window.innerHeight - 241) + 'px';
    }, 100);
  }

  onAddNewEmpClick() {
    this.dialog.open(AddOrEditEmployeeComponent).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }

  openEditForm(row: any) {
    const dialogRef = this.dialog.open(AddOrEditEmployeeComponent, { data: row });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {

        }
      },
    });
  }

  deleteEmployee(id: any) {
    const dialogRef = this.cmf.showConfirmationDialog('Do you want to Delete this records ?', 'This cannot be undone.');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.rowData.findIndex(x => x.id == id);
        this.rowData.splice(index, 1);
        this.rowData = [...this.rowData]
        this.mService.showSnackBar('Success', 'Employee was deleted successfully!');
      }
    });
  }
}
