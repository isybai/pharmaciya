import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getTasks(): Observable<any> {
    return this.http.get('/api/tasks').map(res => res.json());
  }

  countTasks(): Observable<any> {
    return this.http.get('/api/tasks/count').map(res => res.json());
  }

  addTask(task): Observable<any> {
    return this.http.post('/api/task', JSON.stringify(task), this.options);
  }

  getTask(task): Observable<any> {
    return this.http.get(`/api/task/${task._id}`).map(res => res.json());
  }

  editTask(task): Observable<any> {
    return this.http.put(`/api/task/${task._id}`, JSON.stringify(task), this.options);
  }

  deleteTask(task): Observable<any> {
    return this.http.delete(`/api/task/${task._id}`, this.options);
  }

}
