import { Component, OnInit } from '@angular/core';
import {ProductListService} from "../product-list.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CartService} from "../cart.service";
import {UserTypes} from "../UserTypes";
import {CartTypes} from "../CartTypes";
import {ProductTypes} from "../ProductTypes";
import {AuthenticationService} from "../authentication.service";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public allProducts=[];
  private product;
  private productId;
  private user;
  private role;
  constructor(private productService : ProductListService,private cartService: CartService ,private loginService: AuthenticationService, private route: ActivatedRoute,private regService: RegistrationService) { }
  ngOnInit()
  {
    this.regService.getUser().subscribe(data => {
      this.user = data;
      this.role = this.user.role;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'));
      this.productId=id;
    });

    this.productService.getOneProduct(this.productId).subscribe((data => this.product = data));
  }

    findProduct(id)
    {
      for(let i=0;i<this.allProducts.length;i++)
      {
        if(id==this.allProducts[i].id)
        {
          this.product=this.allProducts[i];
        }
      }
    }

  addtoCart(productId) {
      this.cartService.addToCart(productId).subscribe((data)=>
      alert("added successfully"));

  }

  editProdDetails() {
      this.productService.editProductDetails(this.product).subscribe(data =>
      {
        alert("product edited!");
      })
  }
}
