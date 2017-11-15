import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  todays:string;
  constructor(public auth: AuthService) {
  	 this.todaySday();
  }

  todaySday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd = 0+dd
    } 

    if(mm<10) {
        mm = 0 + mm
    } 

    this.todays = dd + '-' + mm + '-' + yyyy;
  }
}
