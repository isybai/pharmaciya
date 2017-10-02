import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(public auth: AuthService) { }
}
