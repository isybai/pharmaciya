import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RenterService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getRenters(): Observable<any> {
    return this.http.get('/api/renters').map(res => res.json());
  }

  countRenters(): Observable<any> {
    return this.http.get('/api/renters/count').map(res => res.json());
  }

  addRenter(renter): Observable<any> {
    return this.http.post('/api/renter', JSON.stringify(renter), this.options);
  }

  getRenter(renter): Observable<any> {
    return this.http.get(`/api/renter/${renter._id}`).map(res => res.json());
  }

  editRenter(renter): Observable<any> {
    return this.http.put(`/api/renter/${renter._id}`, JSON.stringify(renter), this.options);
  }

  deleteRenter(renter): Observable<any> {
    return this.http.delete(`/api/renter/${renter._id}`, this.options);
  }

}
