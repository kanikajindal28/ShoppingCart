import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserTypes} from "./UserTypes";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient ) {}
  private url='http://localhost:2019';

  public createUser(user)
  {
    return this.http.post<UserTypes[]>(this.url + '/addUsers',user);
  }
  public getUser()
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/getuser',{headers});
  }
  public editUser(user)
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.post(this.url + '/edituser',user,{headers});
  }
}
