import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  coreServerUrl = environment.coreServerUrl;

  subExecuteAction = new Subject<{ action: string, data?: any }>();

  getAllItems(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/GetAllItems', opt.body);
  }

  getItemById(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/GetItemById', opt.body);
  }

  addItem(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/AddItem', opt.body);
  }

  updateItem(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/UpdateItem', opt.body);
  }

  deleteItem(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/DeleteItem', opt.body);
  }

  getAllUnits(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/GetAllUnits', opt.body);
  }

  getUnitById(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/GetUnitById', opt.body);
  }

  addUnit(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/AddUnit', opt.body);
  }

  updateUnit(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/UpdateUnit', opt.body);
  }

  deleteUnit(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Item/DeleteUnit', opt.body);
  }


  getAllCustomers(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Customer/GetAllCustomers', opt.body);
  }

  getCustomerById(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Customer/GetCustomerById/', opt.body);
  }

  addCustomer(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Customer/AddCustomer', opt.body);
  }

  updateCustomer(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Customer/UpdateCustomer', opt.body);
  }

  deleteCustomer(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Customer/DeleteCustomer/', opt.body);
  }

  getBookingData(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Booking/GetAllBookings', opt.body);
  }

  getBookingDataById(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Booking/GetBookingById/', opt.body);
  }

  addBooking(opt: { body: any }) {
    return this.http.post(this.coreServerUrl + 'Booking/AddBooking/', opt.body);
  }

  getCustomerData(opt: { body: any }) {
    // return this.http.post('getCustomerData', opt.body);
    return of([
      { customerId: 1, customerName: 'Suraj', phoneNumber: '7870379846', email: 'raazsoren@gmail.com' },
      { customerId: 2, customerName: 'Uma shankar', phoneNumber: '987654321', email: 'umashankar@gmail.com' },
      { customerId: 3, customerName: 'Abhishek', phoneNumber: '8765345678', email: 'abhishek@gmail.com' }
    ])
  }

  getItemData(opt: { body: any }) {
    // return this.http.post('getCustomerData', opt.body);
    return of([
      { id: 1, itemName: 'nicon camera', price: 1000, unit: 1 },
      { id: 2, itemName: 'canon camera', price: 2000, unit: 2 },
      { id: 3, itemName: '4k recoding camera', price: 3000, unit: 3 }
    ])
  }

  invokeExecuteAction(param: { action: string, data?: any }) {
    this.subExecuteAction.next(param);
  }
}
