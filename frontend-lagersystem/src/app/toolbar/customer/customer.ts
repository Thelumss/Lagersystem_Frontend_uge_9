import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerApiCallServices } from '../../../services/customer-api-call-services';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface Product {
  invoicenummer: number;
  navn: string;
  pris: number;
  status: string;
  mangde: number;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInput,
    MatButtonModule,
    MatSortModule,
    MatIcon,
    MatIconModule,
    MatLabel,
    MatTableModule, 
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {

    constructor(private api: CustomerApiCallServices) { }

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['invoicenummer','navn', 'pris', 'status', 'mangde'];
  dataSource = new MatTableDataSource<Product>([]);
  products: any[] = [];
  searchInvoiceNumber: number = 0;

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

  searchInvoice() {
      this.loadProducts(this.searchInvoiceNumber);
    }

  loadProducts(invoiceNumber: number = 0) {
    if (invoiceNumber != null){

      this.api.getordersbycustomerId(invoiceNumber).subscribe({
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
}
