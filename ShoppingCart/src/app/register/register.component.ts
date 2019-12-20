import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../registration.service";
import {UserTypes} from "../UserTypes";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private user: UserTypes = new class implements UserTypes {
    active: boolean;
    email: string;
    gender: string;
    id: number;
    mobileNo: number;
    name: string;
    password: string;
    role: string;
    address: string;
  }

  constructor(private httpClientService: RegistrationService,private router: Router) {
  }

  ngOnInit() {

  }

  createUser(): void {
    this.httpClientService.createUser(this.user)
      .subscribe(data => {
        alert("User created successfully.");
        this.router.navigate(['login']);
      });
  }
}


