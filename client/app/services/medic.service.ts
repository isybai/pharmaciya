import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getMedics(): Observable<any> {
    return this.http.get('/api/medics').map(res => res.json());
  }

  countMedics(): Observable<any> {
    return this.http.get('/api/medics/count').map(res => res.json());
  }

  addMedic(medic): Observable<any> {
    return this.http.post('/api/medic', JSON.stringify(medic), this.options);
  }

  getMedic(medic): Observable<any> {
    return this.http.get(`/api/medic/${medic._id}`).map(res => res.json());
  }

  editMedic(medic): Observable<any> {
    return this.http.put(`/api/medic/${medic._id}`, JSON.stringify(medic), this.options);
  }

  deleteMedic(medic): Observable<any> {
    return this.http.delete(`/api/medic/${medic._id}`, this.options);
  }

}
