import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {error} from "util";
import {UserTypes} from "../UserTypes";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /*private user: UserTypes = new class implements UserTypes {
    active: boolean;
    email: string;
    gender: string;
    id: number;
    mobileNo: number;
    name: string;
    password: string;
    role: string;
  }*/
  email = '';
  password = '';
  invalidLogin = false;

  constructor(private router: Router, private loginservice: AuthenticationService) { }

  ngOnInit() {
  }
  checkLogin() {
   this.loginservice.authenticate(this.email, this.password).subscribe(data => {
      this.router.navigate(['home']);
      this.invalidLogin = false;
  },
     error =>
     {
       this.invalidLogin = true;
     });
  }

}
