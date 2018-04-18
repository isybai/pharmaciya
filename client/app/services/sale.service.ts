import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SaleService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getSales(): Observable<any> {
    return this.http.get('/api/sales').map(res => res.json());
  }

  countSales(): Observable<any> {
    return this.http.get('/api/sales/count').map(res => res.json());
  }

  addSale(sale): Observable<any> {
    return this.http.post('/api/sale', JSON.stringify(sale), this.options);
  }

  getSale(sale): Observable<any> {
    return this.http.get(`/api/sale/${sale._id}`).map(res => res.json());
  }

  editSale(sale): Observable<any> {
    return this.http.put(`/api/sale/${sale._id}`, JSON.stringify(sale), this.options);
  }

  deleteSale(sale): Observable<any> {
    return this.http.delete(`/api/sale/${sale._id}`, this.options);
  }

}
