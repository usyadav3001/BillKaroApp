import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from 'src/app/globals';
import { AdminService } from '../../service/admin.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBookingComponent } from '../add-booking/add-booking.component';
declare let $: any;

export interface BookingData {
  BookingId: string;
  CustomerName: string;
  OrderDate: string;
  TotalQuanity: string;
  TotalDiscountAmount: string;
  GrandTotalAmount: string;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-booking-master',
  templateUrl: './booking-master.component.html',
  styleUrls: ['./booking-master.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookingMasterComponent {
  displayedColumns: string[] = ['BookingId', 'CustomerName', 'OrderDate', 'TotalQuanity', 'TotalDiscountAmount', 'GrandTotalAmount', 'Action'];
  dataSource: MatTableDataSource<BookingData>;
  tblHeight;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private adminService: AdminService,
    private datePipe: DatePipe,
    private globals: Globals,
    private _snackBar: MatSnackBar) {

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.getBookingData();
  }
  getBookingData() {
    let body = { CompanyCode: this.globals.companyCode }
    this.adminService.getBookingData({ body }).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.dataSource = new MatTableDataSource(res.Data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.tblHeight = window.innerHeight - $(".booking.-master .-table")[0].offsetTop - 100;
    }, 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickOfCustomerName(row) {
    this.dialog.open(AddBookingComponent);
  }

  onClickOfBookingId(row) {
    this.dialog.open(AddBookingComponent, { data: row });
  }
}