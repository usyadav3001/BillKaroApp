import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { AdminService } from '../../service/admin.service';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemMasterComponent {
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private globals: Globals
  ) { }
  private subscriptions: Subscription = new Subscription();
  arrItemData = [];
  ddlUnitData = [];
  lblRecordCount = "";
  lblShowing = " Showing ";
  lblOf = " of ";
  lblShowingRecord = 0;
  lblTotalRecord = 0;
  quickSearchValue = "";
  tableHeight = "";

  ngOnInit(): void {
    this.setSubscriptions();
    this.getItemData();
    this.getDdlUnitData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableHeight = (window.innerHeight - 241) + 'px';
    }, 100);
  }

  private setSubscriptions() {
    this.subscriptions.add(this.adminService.subExecuteAction.subscribe(res => {
      switch (res.action) {
        case 'addItem_addNewItemData':
          this.arrItemData.push(res.data);
          break;
        case 'addItem_updateNewItemData':
          if (res.data) {
            const index = this.arrItemData.findIndex(x => x.Id == res.data.Id);
            this.arrItemData[index] = res.data;
          }
          break;
      }
    }));
  }

  getDdlUnitData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllUnits({ body }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.ddlUnitData = res.Data;
      }
    })
  }

  getItemData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllItems({ body }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.arrItemData = res.Data;
        this.calculateRecordsCount();
      }
    })
  }

  calculateRecordsCount() {
    this.lblRecordCount = this.lblShowing + this.arrItemData.length + this.lblOf + this.arrItemData.length + " records";
    return this.lblRecordCount;
  }

  onQuickSearch(event) {
    this.quickSearchValue = event.target.value;
  }

  onAddNewItemClick() {
    this.dialog.open(AddItemComponent, { data: { ddlUnitData: this.ddlUnitData, type: 'add' } }).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
  onEditIconClick(opt: { itemData: any }) {
    opt.itemData.ddlUnitData = this.ddlUnitData;
    opt.itemData.type = "update";
    this.dialog.open(AddItemComponent, { data: opt.itemData }).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
  onDeleteIconClick(id) {
    this.adminService.deleteItem({ body: { Id: id, CompanyCode: this.globals.companyCode } }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.arrItemData.splice(this.arrItemData.findIndex(x => x.id == id), 1);
      }
    })
  }
}
