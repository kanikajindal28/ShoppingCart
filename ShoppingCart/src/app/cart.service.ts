import { Injectable } from '@angular/core';
import {UserTypes} from "./UserTypes";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CartTypes} from "./CartTypes";
import {Observable} from "rxjs";
import {ProductTypes} from "./ProductTypes";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private url='http://localhost:2019';
  public addToCart(productId: number)
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/addtocart/'+productId,{headers});
  }
  public showcart()
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/showcart',{headers});
  }
  public decreaseQuantity(productId: number)
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/decreseQuantity/' + productId,{headers});
  }

  increaseQuantity(productId: any) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/addtocart/' + productId,{headers});
  }

  removeProduct(productId: any) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/removeFromcart/' + productId,{headers});
  }

  checkout()
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/checkout',{headers});

  }
}
