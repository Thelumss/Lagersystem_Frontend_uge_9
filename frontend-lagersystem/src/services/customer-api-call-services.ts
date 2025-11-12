import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiCallServices {

  private apiUrl = 'http://localhost:5000/api/orders/ByCustomerID';

  constructor(private http: HttpClient) {}

  getordersbycustomerId(id: number): Observable<any> {
    return this.http.get(this.apiUrl+id);
  }
}
