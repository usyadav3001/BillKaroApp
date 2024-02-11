import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomerMasterComponent } from './component/customer-master/customer-master.component';
import { ItemMasterComponent } from './component/item-master/item-master.component';
import { AddBookingComponent } from './component/add-booking/add-booking.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from './component/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipePipe } from './pipe/filter-pipe.pipe';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CustomSelectComponent } from './component/custom-select/custom-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MaterialExampleModule } from 'src/material.module';
import { UnitMasterComponent } from './component/unit-master/unit-master.component';
import { AddUnitComponent } from './component/add-unit/add-unit.component';
import { AddDiscriptionComponent } from './component/add-discription/add-discription.component';
import { BookingMasterComponent } from './component/booking-master/booking-master.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { AddOrEditEmployeeComponent } from './component/employees/components/add-or-edit-employee.component';
import { LibraryModule } from '../library/library.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CustomerMasterComponent,
    ItemMasterComponent,
    AddBookingComponent,
    AddItemComponent,
    ProgressBarComponent,
    FilterPipePipe,
    AddCustomerComponent,
    CustomSelectComponent,
    UnitMasterComponent,
    AddUnitComponent,
    AddDiscriptionComponent,
    BookingMasterComponent,
    EmployeesComponent,
    AddOrEditEmployeeComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MaterialExampleModule,
    LibraryModule
  ],
  providers: [DatePipe],
})
export class AdminModule { }
