import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WarehouseApiCallServices } from '../../../services/warehouse-api-call-services';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// this is a interface for setup of how the Warehouse should look
export interface Warehouse {
  id: string;
  warehouse_id: string;
  product_id: number;
  quantity: number
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatInput, MatFormFieldModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // the constructor createing WarehouseApiCallServices for use  
  constructor(private api: WarehouseApiCallServices) { }
  
  private _liveAnnouncer = inject(LiveAnnouncer);
  // displayedColumns sets up how many collumns there is needed and what they should contatin
  displayedColumns: string[] = ['id','warehouse_id','product_id','quantity'];
  // dataSource is what holds the data that displayedColumns shows
  dataSource = new MatTableDataSource<Warehouse>([]);
  // Warehouse holds the admins for when they should go over to dataSource
  Warehouse: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadWarehouseProducts();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // this makes a api call that get all of the warehouse information that we would want
  loadWarehouseProducts() {
    this.api.getWarehouse().subscribe({
      next: res => {
        this.Warehouse = res;
        this.dataSource.data = this.Warehouse;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error('API error:', err)
    });
  }

  // This filters the elemens show in the tables based on what they write
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
