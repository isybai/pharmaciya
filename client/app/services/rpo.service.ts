import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RpoService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getRpos(): Observable<any> {
    return this.http.get('/api/rpos').map(res => res.json());
  }

  countRpos(): Observable<any> {
    return this.http.get('/api/rpos/count').map(res => res.json());
  }

  addRpo(rpo): Observable<any> {
    return this.http.post('/api/rpo', JSON.stringify(rpo), this.options);
  }

  getRpo(rpo): Observable<any> {
    return this.http.get(`/api/rpo/${rpo._id}`).map(res => res.json());
  }

  editRpo(rpo): Observable<any> {
    return this.http.put(`/api/rpo/${rpo._id}`, JSON.stringify(rpo), this.options);
  }

  deleteRpo(rpo): Observable<any> {
    return this.http.delete(`/api/rpo/${rpo._id}`, this.options);
  }

}
