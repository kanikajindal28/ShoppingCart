import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {  ProductTypes } from './ProductTypes';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private url='http://localhost:2019';
  constructor(private http: HttpClient) { }


  getAllProducts() : Observable<ProductTypes[]> {
    //const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<ProductTypes[]>(this.url + '/products');
  }
  getOneProduct(id: Number) {
    //const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<ProductTypes>(this.url + '/product-detail/' + id);
  }
  getProductsofCategory(category : string) {
    //const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<ProductTypes[]>(this.url + '/productsFrom/' + category);
  }
  getProductsByPrice(price1 :number,price2 :number) {
    //const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<ProductTypes[]>(this.url + '/products' +'/'+ price1 +'/'+ price2);
  }
  getProductsByCategoryAndPrice(cat,price1,price2) {
    //const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<ProductTypes[]>(this.url + '/products/' +cat +'/'+ price1+'/'+ price2 );
  }

  deleteProduct(productId) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/products/'+ productId+'/delete' ,{headers});

  }

  addProducts(product: ProductTypes)
  {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.post(this.url + '/addproduct',product,{headers});
  }

  editProductDetails(product) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.post(this.url + '/editProduct',product,{headers});
  }

  getSearchedResult(searchedItem: string) {
    return this.http.get(this.url + '/search/'+searchedItem);
  }
}
