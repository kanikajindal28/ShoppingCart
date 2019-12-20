import  { Component, OnInit } from '@angular/core';
import {ProductListService} from '../product-list.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CartService} from "../cart.service";
import {RegistrationService} from "../registration.service";
import {UserTypes} from "../UserTypes";
import {AuthenticationService} from "../authentication.service";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public allProducts;
  private category;
  private user;
  private role;

  constructor(private productListService: ProductListService,private loginservice: AuthenticationService, private router: Router, private route: ActivatedRoute,private cartService: CartService, private regService : RegistrationService) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const cat = params.get('category');
      this.category = cat;
      if (this.category === 'all') {
        this.productListService.getAllProducts().subscribe(data => this.allProducts = data);
        console.log(this.allProducts);
      } else {
        this.productListService.getProductsofCategory(this.category).subscribe(data => this.allProducts = data);
      }
    });
      this.regService.getUser().subscribe(data => {
        this.user = data;
        this.role=this.user.role;
      });
  }

  seeDetails(product) {
    this.router.navigate(['product-detail', product.productId]);
  }

  goTo(category) {
    this.router.navigate(['productsFrom', category]);
  }
  filterPrice(min,max) {

    if (this.category === 'all') {
      this.productListService.getProductsByPrice(min, max).subscribe(data => this.allProducts = data);
    } else {
      this.productListService.getProductsByCategoryAndPrice(this.category,min,max).subscribe(data => this.allProducts = data);
    }

  }
  addtoCart(productId) {
    this.cartService.addToCart(productId).subscribe((data)=>
      alert("added successfully"));

  }

  deleteProduct(productId) {
    this.productListService.deleteProduct(productId).subscribe(data =>
    {
      this.allProducts = data;
      alert("Product Deleted Successfully");
    });
    this.cartService.removeProduct(productId).subscribe(data => {
      console.log(data);
    });
  }


}
