import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {UserTypes} from "./UserTypes";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }
  authenticate(username, password) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+ ':' + password)});
    return this.http.get('http://localhost:2019/validateLogin',{headers}).pipe(
       map(
       userData =>
       {
         sessionStorage.setItem('username',username);
         const authString = 'Basic ' + btoa(username + ':' + password);
         sessionStorage.setItem('basicAuth' ,authString);
         return userData;
       }
     )
    );
    }
  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
