import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LpuService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getLpus(): Observable<any> {
    return this.http.get('/api/lpus').map(res => res.json());
  }

  countLpus(): Observable<any> {
    return this.http.get('/api/lpus/count').map(res => res.json());
  }

  addLpu(lpu): Observable<any> {
    return this.http.post('/api/lpu', JSON.stringify(lpu), this.options);
  }

  getLpu(lpu): Observable<any> {
    return this.http.get(`/api/lpu/${lpu._id}`).map(res => res.json());
  }

  editLpu(lpu): Observable<any> {
    return this.http.put(`/api/lpu/${lpu._id}`, JSON.stringify(lpu), this.options);
  }

  deleteLpu(lpu): Observable<any> {
    return this.http.delete(`/api/lpu/${lpu._id}`, this.options);
  }

}
