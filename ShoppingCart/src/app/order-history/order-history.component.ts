import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {ProductListService} from "../product-list.service";
import {Router} from "@angular/router";
import {UserTypes} from "../UserTypes";
import {ProductTypes} from "../ProductTypes";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  private orderDetails;
  constructor(private cservice : CartService , private router: Router) { }
  ngOnInit() {
    this.cservice.checkout().subscribe(data => {
      this.orderDetails=data;
    });
  }

  viewDetails(id) {
      this.router.navigate(['/product-detail/'+id]);
  }
}
