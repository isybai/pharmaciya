
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class IndividualService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getIndividuals(): Observable<any> {
    return this.http.get('/api/individuals').map(res => res.json());
  }

  countIndividuals(): Observable<any> {
    return this.http.get('/api/individuals/count').map(res => res.json());
  }

  addIndividual(individual): Observable<any> {
    return this.http.post('/api/individual', JSON.stringify(individual), this.options);
  }

  getIndividual(individual): Observable<any> {
    return this.http.get(`/api/individual/${individual._id}`).map(res => res.json());
  }

  editIndividual(individual): Observable<any> {
    return this.http.put(`/api/individual/${individual._id}`, JSON.stringify(individual), this.options);
  }

  deleteIndividual(individual): Observable<any> {
    return this.http.delete(`/api/individual/${individual._id}`, this.options);
  }

}
