import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Subscription } from 'rxjs';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.css']
})
export class UnitMasterComponent {
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private globals: Globals
  ) { }
  private subscriptions: Subscription = new Subscription();
  arrItemData = [];
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableHeight = (window.innerHeight - 241) + 'px';
    }, 100);
  }

  private setSubscriptions() {
    this.subscriptions.add(this.adminService.subExecuteAction.subscribe(res => {
      switch (res.action) {
        case 'addUnit_addNewUnitData':
          this.arrItemData.push(res.data);
          break;
        case 'addUnit_updateNewUnitData':
          if (res.data) {
            const index = this.arrItemData.findIndex(x => x.Id == res.data.Id);
            this.arrItemData[index] = res.data;
          }
          break;
      }
    }));
  }

  getItemData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllUnits({ body }).subscribe((res: any) => {
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
    this.dialog.open(AddUnitComponent).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
  onEditIconClick(opt: { unitData: any }) {
    this.dialog.open(AddUnitComponent, { data: opt.unitData }).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }
  onDeleteIconClick(id) {
    this.adminService.deleteUnit({ body: { Id: id, CompanyCode: this.globals.companyCode } }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.arrItemData.splice(this.arrItemData.findIndex(x => x.id == id), 1);
      }
    })
  }
}
