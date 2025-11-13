import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { NgIf } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AdminApiCallServices } from '../../../services/admin-api-call-services';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Product {
  id: number;
  navn: string;
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgIf,MatTableModule, MatPaginatorModule,MatSortModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'navn'];
  dataSource = new MatTableDataSource<Product>([]);
  products: Product[] = [{id:1,navn:'test'}];

  CreateNewUser() {
  this.adminService.createUser(this.test.value).subscribe(()=>{
    this.test.reset();
  });

}
  
  loginForm!: FormGroup;
  test!: FormGroup;
  isLoggedIn: boolean = false;
  private destroy$ = new Subject<void>();
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  
  ngOnInit(): void {
    this.createForm();
    
    this.authService.currentData
    .pipe(takeUntil(this.destroy$))
    .subscribe(status => {
      this.isLoggedIn = status;
    });
    
    this.isLoggedIn = !!this.authService.getToken();
  }
  
  
  private createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
     this.test = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  constructor(
    private authService: AuthService,
    private adminService: AdminApiCallServices
  ) {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(()=>{
      this.loginForm.reset();
    });
  }
  
}
