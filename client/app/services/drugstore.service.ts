import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DrugstoreService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getDrugstores(): Observable<any> {
    return this.http.get('/api/drugstores').map(res => res.json());
  }

  countDrugstores(): Observable<any> {
    return this.http.get('/api/drugstores/count').map(res => res.json());
  }

  addDrugstore(drugstore): Observable<any> {
    return this.http.post('/api/drugstore', JSON.stringify(drugstore), this.options);
  }

  getDrugstore(drugstore): Observable<any> {
    return this.http.get(`/api/drugstore/${drugstore._id}`).map(res => res.json());
  }

  editDrugstore(drugstore): Observable<any> {
    return this.http.put(`/api/drugstore/${drugstore._id}`, JSON.stringify(drugstore), this.options);
  }

  deleteDrugstore(drugstore): Observable<any> {
    return this.http.delete(`/api/drugstore/${drugstore._id}`, this.options);
  }

}
