import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminApiCallServices {
  
  constructor(private http: HttpClient){}

  createUser(userDetails: { username: string, password: string }) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('JWT_Token')}`,
      'Content-Type': 'application/json'
    });
    console.log(localStorage.getItem('JWT_Token'));
      return this.http.post<any>('http://localhost:5000/api/auth/register', userDetails, { headers})
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
}
