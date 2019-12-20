import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {Router} from "@angular/router";
import {UserTypes} from "../UserTypes";
import {CartTypes} from "../CartTypes";
import {ProductTypes} from "../ProductTypes";

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  constructor(private cartService: CartService,private router: Router) { }
  private sum = 0;
  private cartProducts;
  private cartlength = 0;
  ngOnInit()
  {
      this.cartService.showcart().subscribe(data=> {
        this.cartProducts = data;
        this.cartlength = this.cartProducts.length;
        let total = 0;
        for (let i = 0; i < this.cartlength; i++) {
          total = total + Number(this.cartProducts[i].product.price) * Number(this.cartProducts[i].quantity);
        }
        this.sum = total;
      });

    }

  decQuantity(id) {
    this.cartService.decreaseQuantity(id).subscribe(data1 => {
      this.cartService.showcart().subscribe(data => {
        this.cartProducts=data;
        let total = 0;
        for (let i = 0; i < this.cartlength; i++) {
          total = total + Number(this.cartProducts[i].product.price) * Number(this.cartProducts[i].quantity);
        }
        this.sum = total;
      });
    });
  }

  incQuantity(id) {
    this.cartService.increaseQuantity(id).subscribe(data1 => {
      this.cartService.showcart().subscribe(data => {
        this.cartProducts=data;
        let total = 0;
        for (let i = 0; i < this.cartlength; i++) {
          total = total + Number(this.cartProducts[i].product.price) * Number(this.cartProducts[i].quantity);
        }
        this.sum = total;
      });
    });
  }

  removeProduct(productId: any) {
    this.cartService.removeProduct(productId).subscribe(data1 => {
      this.cartService.showcart().subscribe(data => {

        this.cartProducts=data;
      });
    });
  }

  goToCheckout() {
    this.cartService.checkout().subscribe(data =>{
      this.router.navigate(['/products/all']);
    })
  }
}

