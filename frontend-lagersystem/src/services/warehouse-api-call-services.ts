import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WarehouseApiCallServices {
  // api end points for warehouse
  private apiUrl = 'http://localhost:5000/api/warehouse/';

  constructor(private http: HttpClient) {}

  // call to the API end point homeview
  getWarehouse(): Observable<any> {
    return this.http.get(this.apiUrl+"homeView");
  }

}
