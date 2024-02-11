import { Component, ViewEncapsulation } from '@angular/core';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerMasterComponent {
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private globals: Globals
  ) { }
  private subscriptions: Subscription = new Subscription();
  arrCustomerData = [];
  lblRecordCount = "";
  lblShowing = " Showing ";
  lblOf = " of ";
  lblShowingRecord = 0;
  lblTotalRecord = 0;
  quickSearchValue = "";
  tableHeight = "";

  ngOnInit(): void {
    this.setSubscriptions();
    this.getCustomerData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableHeight = (window.innerHeight - 241) + 'px';
    }, 100);
  }

  private setSubscriptions() {
    this.subscriptions.add(this.adminService.subExecuteAction.subscribe(res => {
      switch (res.action) {
        case 'addCustomer_addCustomerItemData':
          this.arrCustomerData.push(res.data);
          break;
        case 'addCustomer_updateNewCustomerData':
          if (res.data) {
            const index = this.arrCustomerData.findIndex(x => x.Id == res.data.Id);
            this.arrCustomerData[index] = res.data;
          }
          break;
      }
    }));
  }

  getCustomerData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllCustomers({ body }).subscribe((res: any) => {
      this.arrCustomerData = res.Data;
      this.calculateRecordsCount();
    })
  }

  calculateRecordsCount() {
    this.lblRecordCount = this.lblShowing + this.arrCustomerData.length + this.lblOf + this.arrCustomerData.length + " records";
    return this.lblRecordCount;
  }

  onQuickSearch(event) {
    this.quickSearchValue = event.target.value;
  }

  onAddNewItemClick() {
    this.dialog.open(AddCustomerComponent).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }

  onEditIconClick(opt: { itemData: any }) {
    opt.itemData.type = 'update';
    this.dialog.open(AddCustomerComponent, { data: opt.itemData }).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }

  onDeleteIconClick(id) {
    this.adminService.deleteItem({ body: { Id: id, CompanyCode: this.globals.companyCode } }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.arrCustomerData.splice(this.arrCustomerData.findIndex(x => x.id == id), 1);
      }
    })
  }
}
