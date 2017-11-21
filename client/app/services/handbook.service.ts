import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HandbookService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getHandbooks(): Observable<any> {
    return this.http.get('/api/handbooks').map(res => res.json());
  }

  countHandbooks(): Observable<any> {
    return this.http.get('/api/handbooks/count').map(res => res.json());
  }

  addHandbook(handbook): Observable<any> {
    return this.http.post('/api/handbook', JSON.stringify(handbook), this.options);
  }

  getHandbook(handbook): Observable<any> {
    return this.http.get(`/api/handbook/${handbook._id}`).map(res => res.json());
  }

  editHandbook(handbook): Observable<any> {
    return this.http.put(`/api/handbook/${handbook._id}`, JSON.stringify(handbook), this.options);
  }

  deleteHandbook(handbook): Observable<any> {
    return this.http.delete(`/api/handbook/${handbook._id}`, this.options);
  }

}
