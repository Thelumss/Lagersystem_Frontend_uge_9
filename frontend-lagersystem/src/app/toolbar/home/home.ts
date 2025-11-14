import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WarehouseApiCallServices } from '../../../services/warehouse-api-call-services';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';


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

   
  constructor(private api: WarehouseApiCallServices) { }
  
  private _liveAnnouncer = inject(LiveAnnouncer);

  state: boolean = true;

  displayedColumns: string[] = ['id','warehouse_id','product_id','quantity'];
  dataSource = new MatTableDataSource<Warehouse>([]);
  Warehouse: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadProducts();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadProducts() {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeView(){
  }
}
