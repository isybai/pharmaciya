import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isSuperAdmin = false;
  isSalesAdmin = false;
  isRentersAdmin = false;
  isUser = false;
  thisUser: any = {};

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { _id: '', username: '', role: '' };

  constructor(private userService: UserService, private router: Router) {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isSuperAdmin = false;
    this.isSalesAdmin = false;
    this.isRentersAdmin = false;
    this.isUser = false;
    this.router.navigate(['/']);

    this.userService.getUser(this.thisUser).subscribe(
      res => {
      },
      error => console.log(error)
    );
    this.thisUser.status = false;
    this.userService.editUser(this.thisUser).subscribe(
      error => console.log(error)
    );
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {

    this.userService.getUser(decodedUser).subscribe(
      res => {
      },
      error => console.log(error)
    );

    decodedUser.status = true;
    this.userService.editUser(decodedUser).subscribe(
      error => console.log(error)
    );
    this.thisUser = decodedUser;

    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    if (decodedUser.role === 'superAdmin') {
      this.isSuperAdmin = true;
    } else if (decodedUser.role === 'salesAdmin') {
      this.isSalesAdmin = true;
    } else if (decodedUser.role === 'rentersAdmin' ) {
      this.isRentersAdmin = true;
    } else {
      this.isUser = true;
      this.isSuperAdmin = false;
      this.isSalesAdmin = false;
      this.isRentersAdmin = false;
    }
    delete decodedUser.role;
  }

}
