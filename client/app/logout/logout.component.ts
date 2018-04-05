import { Component, OnInit, AfterContentInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent implements AfterContentInit {

  constructor(private auth: AuthService) { }

  ngAfterContentInit() {
    this.auth.logout();
  }

}
