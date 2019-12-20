import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductListService} from "../product-list.service";
import {UserTypes} from "../UserTypes";
import {ProductTypes} from "../ProductTypes";
import * as $ from 'jquery';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  constructor(private router:Router,private pService: ProductListService) { }

  private product: ProductTypes = new class implements ProductTypes {
    id : number;
    name : string;
    price : number;
    category : string;
    image : string;
    details : string;
  }
  ngOnInit() {
  }


  addProducts() {

    if (this.product.name != null && this.product.category != null && this.product.details != null && this.product.image != null &&
      this.product.price != null) {
      if (this.product != null) {
        this.pService.addProducts(this.product).subscribe(data => {
          alert("added");
          this.router.navigate(['/products/all']);
        })
      }
    }
    else {
      alert('Please fill all the details.');
    }

  }

  changeText(Text) {
    $("#selCat").text(Text);
  }
}
