import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  currentData = this.isLoggedIn.asObservable();
  
  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private checkToken() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('JWT_Token');
      this.isLoggedIn.next(!!token); // true if token exists
    }
  }

  login(userDetails: { username: string, password: string }) {
    return this.http.post<any>('http://localhost:5000/api/auth/', userDetails)
      .pipe(
        map(response => {
          localStorage.setItem('JWT_Token', response.token);
          this.setData(true);
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.setData(false);
          return of(false);
        })
      );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('JWT_Token');
    }
    this.isLoggedIn.next(false);
  }

  setData(data: boolean) {
    this.isLoggedIn.next(data);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('JWT_Token');
    }
    return null;
  }
}
