import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TenderService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getTenders(): Observable<any> {
    return this.http.get('/api/tenders').map(res => res.json());
  }

  countTenders(): Observable<any> {
    return this.http.get('/api/tenders/count').map(res => res.json());
  }

  addTender(tender): Observable<any> {
    return this.http.post('/api/tender', JSON.stringify(tender), this.options);
  }

  getTender(tender): Observable<any> {
    return this.http.get(`/api/tender/${tender._id}`).map(res => res.json());
  }

  editTender(tender): Observable<any> {
    return this.http.put(`/api/tender/${tender._id}`, JSON.stringify(tender), this.options);
  }

  deleteTender(tender): Observable<any> {
    return this.http.delete(`/api/tender/${tender._id}`, this.options);
  }

}
