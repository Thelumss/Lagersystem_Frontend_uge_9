import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { NgIf } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AdminApiCallServices } from '../../../services/admin-api-call-services';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin implements OnInit, OnDestroy {
CreateNewUser() {
  this.adminService.createUser(this.test.value).subscribe(()=>{
    this.test.reset();
  });

}
  
  loginForm!: FormGroup;
  test!: FormGroup;
  isLoggedIn: boolean = false;
  private destroy$ = new Subject<void>();
  
  
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
