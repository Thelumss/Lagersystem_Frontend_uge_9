import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminApiCallServices {

  constructor(private http: HttpClient) { }

  // api end points for orders/auth
  private apiUrl = 'http://localhost:5000/api/auth/';

  // creates a new user by sending the username and password along with authorization  
  createUser(userDetails: { username: string, password: string }) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl + 'register', userDetails, { headers })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  // gets the profiles of the users
  getProfiles(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiUrl + 'profile/', { headers });
  }

  // gets the profile of the person that is sign in
  getMeProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiUrl + 'profile/me', { headers });
  }
}
