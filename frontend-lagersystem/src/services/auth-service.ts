import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedIn = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private checkToken() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('JWT_Token');
      this.isLoggedIn.next(!!token); // true if token exists
    }
  }

  // the login function sends the user details and gets a jwt token back and saves it in local storage and sets the isloggedin to true so the other parts of the system can know that we are logged in
  login(userDetails: { username: string, password: string }) {
    return this.http.post<any>('http://localhost:5000/api/auth/', userDetails)
      .pipe(
        map(response => {
          localStorage.setItem('JWT_Token', response.access_token);
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

  // the logout function removes the jwt token from localstorage and set the isloggedin to false  
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('JWT_Token');
    }
    this.isLoggedIn.next(false);
  }

  setData(data: boolean) {
    this.isLoggedIn.next(data);
  }

  // gets the token
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('JWT_Token');
    }
    return null;
  }
}
