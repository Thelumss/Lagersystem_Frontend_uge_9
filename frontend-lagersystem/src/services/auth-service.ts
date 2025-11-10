import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  currentData = this.isLoggedIn.asObservable();

  login(userDetails: { username: string, password: string }) {
    return this.http.post<any>('http://localhost:5000/', userDetails)
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
    localStorage.removeItem('JWT_Token');
    this.setData(false);
  }

  setData(data: boolean) {
    this.isLoggedIn.next(data);
  }
}
