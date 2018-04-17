import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class JapanService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getJapans(): Observable<any> {
    return this.http.get('/api/japans').map(res => res.json());
  }

  countJapans(): Observable<any> {
    return this.http.get('/api/japans/count').map(res => res.json());
  }

  addJapan(japan): Observable<any> {
    return this.http.post('/api/japan', JSON.stringify(japan), this.options);
  }

  getJapan(japan): Observable<any> {
    return this.http.get(`/api/japan/${japan._id}`).map(res => res.json());
  }

  editJapan(japan): Observable<any> {
    return this.http.put(`/api/japan/${japan._id}`, JSON.stringify(japan), this.options);
  }

  deleteJapan(japan): Observable<any> {
    return this.http.delete(`/api/japan/${japan._id}`, this.options);
  }

}
