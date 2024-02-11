import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { ItemMasterComponent } from './component/item-master/item-master.component';
import { CustomerMasterComponent } from './component/customer-master/customer-master.component';
import { AddBookingComponent } from './component/add-booking/add-booking.component';
import { UnitMasterComponent } from './component/unit-master/unit-master.component';
import { BookingMasterComponent } from './component/booking-master/booking-master.component';
import { EmployeesComponent } from './component/employees/employees.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'unitMaster', component: UnitMasterComponent },
            { path: 'itemMaster', component: ItemMasterComponent },
            { path: 'customerMaster', component: CustomerMasterComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: 'booking', component: AddBookingComponent },
            { path: 'viewBookings', component: BookingMasterComponent },
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
