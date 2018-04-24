import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DocService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getDocs(): Observable<any> {
    return this.http.get('/api/docs').map(res => res.json());
  }

  countDocs(): Observable<any> {
    return this.http.get('/api/docs/count').map(res => res.json());
  }

  addDoc(doc): Observable<any> {
    return this.http.post('/api/doc', JSON.stringify(doc), this.options);
  }

  getDoc(doc): Observable<any> {
    return this.http.get(`/api/doc/${doc._id}`).map(res => res.json());
  }

  editDoc(doc): Observable<any> {
    return this.http.put(`/api/doc/${doc._id}`, JSON.stringify(doc), this.options);
  }

  deleteDoc(doc): Observable<any> {
    return this.http.delete(`/api/doc/${doc._id}`, this.options);
  }

}
