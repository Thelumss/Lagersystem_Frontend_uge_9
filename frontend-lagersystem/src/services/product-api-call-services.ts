import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductApiCallServices {

  // api end points for product
  private apiUrl = 'http://localhost:5000/api/product/';

  constructor(private http: HttpClient) { }

  // calls to the API end point
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
