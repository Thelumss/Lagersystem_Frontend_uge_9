import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AdminApiCallServices } from '../../../services/admin-api-call-services';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

// this is a interface for setup of how the admins should look
export interface admins {
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
  
  // displayedColumns sets up how many collumns there is needed and what they should contatin
  displayedColumns: string[] = ['id', 'name'];
  // dataSource is what holds the data that displayedColumns shows
  dataSource = new MatTableDataSource<admins>([]);
  // admins holds the admins for when they should go over to dataSource
  admins: admins[] = [];

  // loginfrom and createadminfrom are both froms the setup of the froms and and how to get the information out of them
  loginForm!: FormGroup;
  createAdminForm!: FormGroup;
  // isLoggedIn simply tells the system that they are log in or not
  isLoggedIn: boolean = false;

  private destroy$ = new Subject<void>();
  private _liveAnnouncer = inject(LiveAnnouncer);
  // a temp holder for the curret admin
  user={
    name: 'not_working',
    id: -1
  };
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // the constructor createing AuthService and AdminApiCallServices for use 
  constructor(
    private authService: AuthService,
    private adminService: AdminApiCallServices
  ) {}

  // CreateNewUser creates a user by caling the CreateNewUser function on adminService that makes a API call
  CreateNewUser() {
    // for API it gets the values from createAdminForm
    (this.adminService.createUser(this.createAdminForm.value)).subscribe(()=>{
      this.createAdminForm.reset();
    });

    this.tableRefresh();
  }
  
  
  // ngOnInit does things on init
  ngOnInit(): void {
    // calls the createFrom funtion
    this.createForm();
    
    // here we subscribe this.isLoggedIn with the status from the authService.loggedIn to always know the status of of login acros components
    this.authService.loggedIn
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
  
  // this should Refresh table that shows all of the admins 
  tableRefresh(){
      this.adminService.getProfiles().subscribe({
        next: (res) => {
          this.admins = res;
          this.dataSource.data = this.admins;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.error('Error fetching profiles:', err); 
        },
      });
  }

  // this changes the this.user to show the actucal information from the admin
  CurrentUserupdate(){
    this.adminService.getMeProfile().subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.error('Error fetching meprofile:', err); 
        },
      });
  }
  
  // creates the froms and there requriments
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onSubmit() {
  // Performs login first and then it this.tableRefresh() and this.CurrentUserupdate() couse now we have a jwt token to use
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
