import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiCallServices {

  // api end points for orders/ByCustomerID
  private apiUrl = 'http://localhost:5000/api/orders/ByCustomerID';

  constructor(private http: HttpClient) {}

  //calls to the API end point orders/ByCustomerID and give the id
  getordersbycustomerId(id: number): Observable<any> {
    return this.http.get(this.apiUrl+id);
  }
}
