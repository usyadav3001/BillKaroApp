import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-views',
  templateUrl: './table-views.component.html',
  styleUrls: ['./table-views.component.css']
})
export class TableViewsComponent {
  @Input() displayedColumns:any;
  dataSource: MatTableDataSource<any>;
  @Input() rowData;
  @Output() onClick = new EventEmitter()
  @Output() onClicksEdit = new EventEmitter()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(){

}
  ngOnInit(){
    console.log("data",this.rowData)
    this.dataSource = new MatTableDataSource(this.rowData);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteEmployee(id:number){
   this.onClick.emit(id);
  }  
  openEditForm(data){
    this.onClicksEdit.emit(data);
  }
  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
