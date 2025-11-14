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
  name: string;
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgIf,MatTableModule, MatPaginatorModule,MatSortModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Product>([]);
  products: Product[] = [];

  CreateNewUser() {
    (this.adminService.createUser(this.createAdminForm.value)).subscribe(()=>{
      this.createAdminForm.reset();
    });

    this.tableRefresh();
  }

  user={
    name: 'not_working',
    id: -1
  };
  
  loginForm!: FormGroup;
  createAdminForm!: FormGroup;
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

    if (this.isLoggedIn){
      this.tableRefresh();
      this.CurrentUserupdate();
    }
  }
  
  tableRefresh(){
      this.adminService.getProfiles().subscribe({
        next: (res) => {
          this.products = res;
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.error('Error fetching profiles:', err); 
        },
      });
  }

  CurrentUserupdate(){
    this.adminService.getMeProfile().subscribe({
        next: (res) => {
          this.user = res;
          console.log(res);
        },
        error: (err) => {
          console.error('Error fetching meprofile:', err); 
        },
      });
  }
  
  private createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
     this.createAdminForm = new FormGroup({
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
  // Perform login first
  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
      this.loginForm.reset();
      this.tableRefresh();
      this.CurrentUserupdate();

    },
    error: (err) => {
      console.error('Login failed:', err);
    },
  });
}

logout(){
  this.authService.logout();
}

  
}
