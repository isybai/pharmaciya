import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: any = {};
  users = [];
  isLoading = true;
  isEditing = false;

  addUserForm: FormGroup;
  username = new FormControl('', Validators.required);
  nick = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);


  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private http: Http,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.addUserForm = this.formBuilder.group({
      username: this.username,
      nick: this.nick,
      email: this.email,
      password: this.password,
      role: this.role,
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('user deleted successfully.', 'success'),
      error => console.log(error),
      () => this.getUsers()
    );
  }

  editUser(user) {
    user.status = true;
    this.userService.editUser(user).subscribe(
      data => this.toast.setMessage('user changed successfully.', 'success'),
      error => console.log(error),
      () => this.getUsers()
    );
  }
  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
  }
  addUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(
      res => {
        const newUser = res.json();
        this.users.push(newUser);
        this.addUserForm.reset();
        this.toast.setMessage('Пользователь успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
  }
  cancelEditing() {
    this.isEditing = false;
    this.user = {};
    this.toast.setMessage('Редактирование пользователя отменена.', 'warning');
    this.getUsers();
  }

}
