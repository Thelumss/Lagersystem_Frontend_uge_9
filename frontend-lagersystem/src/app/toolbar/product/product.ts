import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductApiCallServices } from '../../../services/product-api-call-services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

// this is a interface for setup of how the admins should look
export interface Product {
  price: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSortModule,MatInput,MatFormFieldModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})

export class Product {

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  // the constructor createing ProductApiCallServices for use  
  constructor(private api: ProductApiCallServices) { }

  private _liveAnnouncer = inject(LiveAnnouncer);
  // displayedColumns sets up how many collumns there is needed and what they should contatin
  displayedColumns: string[] = ['name', 'price', 'status'];
  // dataSource is what holds the data that displayedColumns shows
  dataSource = new MatTableDataSource<Product>([]);
  // products holds the admins for when they should go over to dataSource
  products: any[] = [];

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

  // this makes a api call that get all of the Product information that we would want
  loadProducts() {
    this.api.getProducts().subscribe({
      next: res => {
        this.products = res;
        this.dataSource.data = this.products;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error('API error:', err)
    });
  }

}
