import { AuthService } from '../services/auth.service';
import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';

import { SaleClientService } from '../services/saleClient.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  saleClient: any = {};
  saleClients = [];
  users = [];
  isLoading = true;
  isEditing = false;

  addSaleClientForm: FormGroup;
  name = new FormControl('', Validators.required);
  adress = new FormControl('', Validators.required);
  whos = new FormControl(null);
  todays: string;
  index: any = [];

  transferDataSuccess($event: any, item) {
    $event.dragData.whos = item.username;
    this.saleClientService.editSaleClient($event.dragData).subscribe(
      res => {
        this.isEditing = false;
        this.saleClient = $event.dragData;
        this.toast.setMessage('Задача распределена агенту.', 'success');
      },
      error => console.log(error)
    );
  }
  removeItem(client) {
    client.whos = null;
    this.saleClientService.editSaleClient(client).subscribe(
      res => {
        this.isEditing = false;
        this.saleClient = client;
        this.toast.setMessage('Задача отобранна от агента.', 'success');
      },
      error => console.log(error)
    );
  }
  constructor(public auth: AuthService,
    private saleClientService: SaleClientService,
    public userService: UserService,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private http: Http,
    public toast: ToastComponent) {
      this.todaySday();
  }
  ngOnInit() {
    this.getUsers();
    this.getSaleClients();
    this.addSaleClientForm = this.formBuilder.group({
      name: this.name,
      adress: this.adress,
    });
  }
  getUsers() {
    let a = 0;
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () =>  {for (let user of this.users) {
        if (user.role === 'user') {
          a = a + 1;
          this.index.push(a);
        } else {}
         console.log(this.index);
      }}
    );
  }

  getSaleClients() {
    this.saleClientService.getSaleClients().subscribe(
      data => this.saleClients = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  addSaleClient() {
    this.saleClientService.addSaleClient(this.addSaleClientForm.value).subscribe(
      res => {
        const newSaleClient = res.json();
        this.saleClients.push(newSaleClient);
        this.addSaleClientForm.reset();
        this.toast.setMessage('Клиент успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(saleClient) {
    this.isEditing = true;
    this.saleClient = saleClient;
  }

  cancelEditing() {
    this.isEditing = false;
    this.saleClient = {};
    this.toast.setMessage('Редактирование клиента отменена.', 'warning');
    // reload the saleClients to reset the editing
    this.getSaleClients();
  }

  editSaleClient(saleClient) {
    this.saleClientService.editSaleClient(saleClient).subscribe(
      res => {
        this.isEditing = false;
        this.saleClient = saleClient;
        this.toast.setMessage('Клиент успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteSaleClient(saleClient) {
    if (window.confirm('Вы уверенны что хотите удалить этого клиента?')) {
      this.saleClientService.deleteSaleClient(saleClient).subscribe(
        res => {
          const pos = this.saleClients.map(elem => elem._id).indexOf(saleClient._id);
          this.saleClients.splice(pos, 1);
          this.toast.setMessage('Клиент успешно удален.', 'success');
        },
        error => console.log(error)
      );
    }
  }
  todaySday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = 0 + dd;
    }

    if (mm < 10) {
      mm = 0 + mm;
    }

    this.todays = dd + '-' + mm + '-' + yyyy;
  }
}


