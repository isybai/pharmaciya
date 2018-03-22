import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SaleClientService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getSaleClients(): Observable<any> {
    return this.http.get('/api/saleClients').map(res => res.json());
  }

  countSaleClients(): Observable<any> {
    return this.http.get('/api/saleClients/count').map(res => res.json());
  }

  addSaleClient(saleClient): Observable<any> {
    return this.http.post('/api/saleClient', JSON.stringify(saleClient), this.options);
  }

  getSaleClient(saleClient): Observable<any> {
    return this.http.get(`/api/saleClient/${saleClient._id}`).map(res => res.json());
  }

  editSaleClient(saleClient): Observable<any> {
    return this.http.put(`/api/saleClient/${saleClient._id}`, JSON.stringify(saleClient), this.options);
  }

  deleteSaleClient(saleClient): Observable<any> {
    return this.http.delete(`/api/saleClient/${saleClient._id}`, this.options);
  }

}
