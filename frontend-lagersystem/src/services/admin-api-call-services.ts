import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminApiCallServices {
  
  constructor(private http: HttpClient){}

  private apiUrl = 'http://localhost:5000/api/auth/';

  createUser(userDetails: { username: string, password: string }) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
      return this.http.post<any>(this.apiUrl+'register', userDetails, { headers})
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

    getProfiles(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiUrl+'profile/', {headers});
  }

    getMeProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiUrl+'profile/me', {headers});
  }
}
