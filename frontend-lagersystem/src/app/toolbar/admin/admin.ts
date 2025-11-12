import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { NgIf } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin implements OnInit, OnDestroy {
  
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
  tester() {
  throw new Error('Method not implemented.');
  }
  
  constructor(
    private authService: AuthService
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
