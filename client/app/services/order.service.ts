import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getOrders(): Observable<any> {
    return this.http.get('/api/orders').map(res => res.json());
  }

  countOrders(): Observable<any> {
    return this.http.get('/api/orders/count').map(res => res.json());
  }

  addOrder(order): Observable<any> {
    return this.http.post('/api/order', JSON.stringify(order), this.options);
  }

  getOrder(order): Observable<any> {
    return this.http.get(`/api/order/${order._id}`).map(res => res.json());
  }

  editOrder(order): Observable<any> {
    return this.http.put(`/api/order/${order._id}`, JSON.stringify(order), this.options);
  }

  deleteOrder(order): Observable<any> {
    return this.http.delete(`/api/order/${order._id}`, this.options);
  }

}
