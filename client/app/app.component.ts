import { Component, OnInit, AfterContentInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  user = {};
  users = [];

	constructor(public auth: AuthService,
              private userService: UserService) { }
  ngAfterContentInit() {

  }
}
