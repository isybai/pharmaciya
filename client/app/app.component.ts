import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user = {};
  users = [];
	constructor(public auth: AuthService,
              private userService: UserService) { }
  ngOnInit() {
    this.getUsers();
    this.getUser();
  }
  test() {
    this.ngOnInit();
    console.log(this.user);
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }
  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }
  editUser(user) {

    this.userService.editUser(user).subscribe(
      res => {
        //this.user = coworker;
      },
      error => console.log(error)
    );
  }
}
