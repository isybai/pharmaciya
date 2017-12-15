import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


  user = {};
  users = [];
  order = {};
  orders = [];

  isLoading = true;
  isEditing = false;

  addOrderForm: FormGroup;

  name = new FormControl('', Validators.required);
  product = new FormControl('', Validators.required);
  count = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);

  constructor(private userService: UserService,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) {

               }

  ngOnInit() {
    this.getUsers();
    this.getOrders();
    this.addOrderForm = this.formBuilder.group({
      name: this.name,
      product: this.product,
      count: this.count,
      date: this.date,
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      data => this.orders = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addOrder() {
    this.orderService.addOrder(this.addOrderForm.value).subscribe(
      res => {
        const newOrder = res.json();
        this.orders.push(newOrder);
        this.addOrderForm.reset();
        this.toast.setMessage('Новый заказ создан успешно.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(order) {
    this.isEditing = true;
    this.order = order;
  }

  cancelEditing() {
    this.isEditing = false;
    this.order = {};
    this.toast.setMessage('Редактирование плана отменено!', 'warning');
    // reload the orders to reset the editing
    this.getOrders();
  }

  editOrder(order) {
    this.orderService.editOrder(order).subscribe(
      res => {
        this.isEditing = false;
        this.order = order;
        this.toast.setMessage('Заказ отредактирован!', 'success');
      },
      error => console.log(error)
    );
  }

  deleteOrder(order) {
    if (window.confirm('Вы хотите удалить заказ?')) {
      this.orderService.deleteOrder(order).subscribe(
        res => {
          const pos = this.orders.map(elem => elem._id).indexOf(order._id);
          this.orders.splice(pos, 1);
          this.toast.setMessage('План удален!', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
