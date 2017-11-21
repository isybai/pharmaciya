import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoworkerService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCoworkers(): Observable<any> {
    return this.http.get('/api/coworkers').map(res => res.json());
  }

  countCoworkers(): Observable<any> {
    return this.http.get('/api/coworkers/count').map(res => res.json());
  }

  addCoworker(coworker): Observable<any> {
    return this.http.post('/api/coworker', JSON.stringify(coworker), this.options);
  }

  getCoworker(coworker): Observable<any> {
    return this.http.get(`/api/coworker/${coworker._id}`).map(res => res.json());
  }

  editCoworker(coworker): Observable<any> {
    return this.http.put(`/api/coworker/${coworker._id}`, JSON.stringify(coworker), this.options);
  }

  deleteCoworker(coworker): Observable<any> {
    return this.http.delete(`/api/coworker/${coworker._id}`, this.options);
  }

}
