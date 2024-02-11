import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AdminService } from '../../service/admin.service';
import { DatePipe } from '@angular/common';
import { Globals } from 'src/app/globals';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AddDiscriptionComponent } from '../add-discription/add-discription.component';

@Component({
  selector: 'app-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBookingComponent implements OnInit {
  constructor(private dialog: MatDialog, private adminService: AdminService,
    private datePipe: DatePipe,
    private globals: Globals,
    private _snackBar: MatSnackBar,
    // @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    const currentDate = new Date();
    this.orderDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }
  fullName;
  phoneNumber = "";
  orderNumber = '1001';
  orderDate = "";
  selectedValue: string;
  selectedCar: string;
  customerAttirbute = "Id";
  description = "";

  arrUnitData = [];
  allOptions = ['suraj', 'kumar', 'soren'];
  isAddNewCustomerBtnDisabled = false;
  txtCustomerFormControl = new FormControl('');
  // arrItemData: string[] = ['One', 'Two', 'Three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  arrCustomerfilteredOptions: Observable<any[]>;
  arrCustomerData = [];

  txtItemFormControl = new FormControl('');
  arrItemsfilteredOptions: Observable<any[]>;
  arrItemData = [];

  objBookingRow = {
    bookingId: -1,
    itemId: "",
    ItemName: "",
    quantity: "",
    unit: "",
    price: "",
    discountPercentage: "",
    discountAmount: "",
    taxPercentage: "",
    taxAmount: "",
    totalAmount: ""
  }
  arrBookingData = [];
  tableHeight = "";
  roundOffPoint = 2;
  grandDiscountAmount = 0;

  ngOnInit(): void {
    this.arrBookingData.push(this.deepCopy(this.objBookingRow));
    this.getCustomerData();
    this.getItemData();
    this.getUnitData();

    // if (this.data) {

    // }

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableHeight = (window.innerHeight - 325) + 'px';
    }, 100);
  }
  getCustomerData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllCustomers({ body }).subscribe((res: any) => {
      this.arrCustomerData = res.Data;
      this.arrCustomerfilteredOptions = this.txtCustomerFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCustomerData(value || '')),
      );
    })
  }

  getUnitData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllUnits({ body }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.arrUnitData = res.Data;
      }
    })
  }

  getItemData() {
    let body = { CompanyCode: this.globals.companyCode };
    this.adminService.getAllItems({ body }).subscribe((res: any) => {
      this.arrItemData = res.Data;
      this.arrItemsfilteredOptions = this.txtItemFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterItemData(value || '')),
      );
    })
  }

  private _filterItemData(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.arrItemData.filter(option => option.ItemName.toLowerCase().includes(filterValue));
  }

  private _filterCustomerData(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.arrCustomerData.filter(option => option.FullName.toLowerCase().includes(filterValue));
  }

  onTxtCustomerFormControlBlur() {
    this.isTxtCustomerControlDisabled();
  }

  onCustomerOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.isTxtCustomerControlDisabled();
  }

  isTxtCustomerControlDisabled() {
    let objExistingCustomer = this.arrCustomerData.find(c => c.FullName.toLocaleLowerCase() == this.txtCustomerFormControl.value.toLocaleLowerCase());
    if (objExistingCustomer) {
      this.phoneNumber = objExistingCustomer.PhoneNo;
      this.isAddNewCustomerBtnDisabled = true;
    }
    else {
      this.phoneNumber = "";
      this.isAddNewCustomerBtnDisabled = false;
    }
  }

  onAddNewCustomerIconClick() {
    const data = {
      type: 'add',
      FullName: this.txtCustomerFormControl.value,
      PhoneNo: this.phoneNumber
    }
    this.dialog.open(AddCustomerComponent, { data }).afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }

  onAddDiscriptionIconClick() {
    this.dialog.open(AddDiscriptionComponent, { data: { action: 'add', description: this.description } }).afterClosed().subscribe(res => {
      if (res) {
        this.description = res;
      }
    });
  }

  onTxtItemFormControlBlur(objItemData) {
    this.fillOtherControlOnItemChange(objItemData);
  }

  onTxtItemFormControlKeyUp(opt: { event: any, data: any }) {
    if (opt.event.target.value != "") {
      opt.data.ItemName = "";
    }
  }

  onTxtItemOptionSelected(objItemData) {
    objItemData.ItemName = JSON.parse(JSON.stringify(this.txtItemFormControl.value));
    this.fillOtherControlOnItemChange(objItemData);
  }

  fillOtherControlOnItemChange(objItemData) {
    let objExistingItem = this.arrItemData.find(c => c.ItemName.toLocaleLowerCase() == objItemData.ItemName.toLocaleLowerCase());
    if (objExistingItem) {
      objItemData.itemId = objExistingItem.Id;
      objItemData.price = objExistingItem.Price;
      objItemData.unit = objExistingItem.UnitName;
    }
    else {
      objItemData.price = "";
      objItemData.unit = "";
    }
    this.txtItemFormControl.setValue("");
    this.findDiscountAmount({ objItemData });
    this.findTaxAmount({ objItemData });
  }

  onQuantityChange(opt: { event: any, objItemData: any }) {
    opt.objItemData.quantity = opt.event.target.value;
  }

  onPriceChange(opt: { event: any, objItemData: any }) {
    opt.objItemData.price = opt.event.target.value;
    this.findDiscountAmount(opt);
    this.findTaxAmount(opt);
  }


  onDiscountPercentageChange(opt: { event: any, objItemData: any }) {
    opt.objItemData.discountPercentage = opt.event.target.value;
    this.findDiscountAmount(opt);
    this.findTaxAmount(opt);
    // this.findItemTotal(opt.objItemData);
  }

  onDiscountAmountChange(opt: { event: any, objItemData: any }) {
    opt.objItemData.discountAmount = opt.event.target.value;
    let discountedPercentage = (Number(opt.objItemData.discountAmount) / Number(opt.objItemData.price)) * 100;
    opt.objItemData.discountPercentage = discountedPercentage.toString().includes(".") ? Number(discountedPercentage.toFixed(1)) : discountedPercentage;
    this.findTaxAmount(opt);
    this.findTaxAmount(opt);
    // this.findItemTotal(opt.objItemData);
  }


  onTaxPercentageChange(opt: { event: any, objItemData: any }) {
    opt.objItemData.taxPercentage = opt.event.target.value;
    this.findTaxAmount(opt);
    this.findItemTotal(opt.objItemData);
  }

  onTaxAmountChange(opt: { event: any, objItemData: any }) {
    opt.objItemData.taxAmount = opt.event.target.value;
    let taxableTotalAmount = Number(opt.objItemData.price) - Number(opt.objItemData.discountAmount);
    let taxPercentage = (Number(opt.objItemData.taxAmount) / Number(taxableTotalAmount)) * 100;
    opt.objItemData.taxPercentage = taxPercentage.toString().includes(".") ? Number(taxPercentage.toFixed(1)) : taxPercentage;
    this.findItemTotal(opt.objItemData);
  }

  findDiscountAmount(opt: { objItemData: any }) {
    let discountedAmount = ((Number(opt.objItemData.discountPercentage) * Number(opt.objItemData.price)) / 100);
    opt.objItemData.discountAmount = this.roundOff({ amount: discountedAmount });
    this.findItemTotal(opt.objItemData);
  }

  findTaxAmount(opt: { objItemData: any }) {
    let taxableTotalAmount = Number(opt.objItemData.price) - Number(opt.objItemData.discountAmount);
    let taxAmount = (Number(opt.objItemData.taxPercentage) * Number(taxableTotalAmount)) / 100;
    opt.objItemData.taxAmount = this.roundOff({ amount: taxAmount });
    this.findItemTotal(opt.objItemData);
  }

  findItemTotal(objItemData) {
    let total = (Number(objItemData.price) + Number(objItemData.taxAmount)) - Number(objItemData.discountAmount);
    objItemData.totalAmount = this.roundOff({ amount: total });
  }

  roundOff(opt: { amount, decimalPoint?: number }) {
    opt.decimalPoint = opt.decimalPoint ? opt.decimalPoint : 2;
    if (opt.amount.toString().includes('.') && opt.amount.toString().split('.')[1].length > 2) {
      opt.amount = Number(opt.amount).toFixed(opt.decimalPoint);
    }
    return opt.amount;
  }

  getTotalQuantity() {
    const arrTotalQuantity = this.arrBookingData.map(b => b.quantity);
    if (arrTotalQuantity.length) {
      const t = arrTotalQuantity.reduce((totalQuantity, quantity) => Number(totalQuantity) + Number(quantity));
      return t == "" ? 0 : t;
    }
    return 0;
  }

  getTotalDiscount() {
    const arrTotalDiscount = this.arrBookingData.map(b => b.discountAmount);
    if (arrTotalDiscount.length) {
      const t = arrTotalDiscount.reduce((totalDiscount, discount) => Number(totalDiscount) + Number(discount));
      return t == "" ? 0 : Number(t).toFixed(2);
    }
    return 0;
  }

  getTotalTax() {
    const arrTotalTax = this.arrBookingData.map(b => b.taxAmount);
    if (arrTotalTax.length) {
      const t = arrTotalTax.reduce((totalTax, taxAmount) => Number(totalTax) + Number(taxAmount));
      return t == "" ? 0 : Number(t).toFixed(2);
    }
    return 0;
  }

  getTotalAmount() {
    const arrTotalAmount = this.arrBookingData.map(b => b.totalAmount);
    if (arrTotalAmount.length) {
      const t = arrTotalAmount.reduce((totalAmount, amount) => Number(totalAmount) + Number(amount));
      return t == "" ? 0 : Number(t).toFixed(2);
    }
    return 0;
  }

  onItemDelete(rowIndex) {
    if (this.arrBookingData.length == 1) {
      this.arrBookingData = [this.deepCopy(this.objBookingRow)];
    }
    else {
      this.arrBookingData.splice(rowIndex, 1);
    }
  }

  onAddNewRowIconClick() {
    this.objBookingRow.bookingId--;
    this.txtItemFormControl.setValue("");
    this.arrBookingData.push(this.deepCopy(this.objBookingRow));
  }

  deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  onTotalDiscountAmountChange(opt: { event: any }) {
    this.grandDiscountAmount = opt.event.target.value;
  }

  onRoundOffChange(opt: { event: any }) {
    this.roundOffPoint = opt.event.target.value;

  }

  getGrandTotalAmount() {
    let totalAmount = this.getTotalAmount();
    return (Number(totalAmount) - Number(this.grandDiscountAmount)).toFixed(this.roundOffPoint);
  }

  onPrintIconClick() {
    window.print();
  }

  onSaveBooking() {
    const customerId = this.arrCustomerData.find(c => c.FullName == this.txtCustomerFormControl.value).Id;
    const orderDate = this.orderDate;
    const totalQuanity = this.getTotalQuantity();
    const totalDiscount = this.getTotalDiscount();
    const totalTax = this.getTotalTax();
    const totalAmount = this.getTotalAmount();
    const grandTotal = this.getGrandTotalAmount();
    let arrBookingData = [];
    this.arrBookingData.forEach(obj => {
      arrBookingData.push({
        BookingId: obj.bookingId,
        ItemId: obj.itemId,
        Quantity: obj.quantity,
        UnitId: this.arrUnitData.find(x => x.UnitName == obj.unit)?.Id,
        Price: Number(obj.price),
        DiscountPercentage: Number(obj.discountPercentage),
        DiscountAmount: Number(obj.discountAmount),
        GrandDiscountAmount: Number(this.grandDiscountAmount),
        TaxPercentage: Number(obj.taxPercentage),
        TaxAmount: Number(obj.taxAmount),
        TotalAmount: Number(obj.totalAmount),
        CompanyCode: this.globals.companyCode,
        CreatedBy: this.globals.userDetail.userFullName,
      })
    })
    let payload = {
      CustomerId: customerId,
      OrderDate: orderDate,
      Discription: this.description,
      TotalQuanity: Number(totalQuanity),
      TotalDiscountAmount: Number(totalDiscount),
      TotalTaxAmount: Number(totalTax),
      TotalAmount: Number(totalAmount),
      GrandDiscountAmount: Number(this.grandDiscountAmount),
      GrandTotalAmount: Number(grandTotal),
      CompanyCode: this.globals.companyCode,
      CreatedBy: this.globals.userDetail.userFullName,
      BookingData: arrBookingData
    }
    console.log(this.arrBookingData);
    this.adminService.addBooking({ body: payload }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.openSnackBar();
      }
    })
  }

  openSnackBar() {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    this._snackBar.open('', 'Booking Successfull', config);
  }
}
