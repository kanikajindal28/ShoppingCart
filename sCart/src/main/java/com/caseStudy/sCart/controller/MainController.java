package com.caseStudy.sCart.controller;

import com.caseStudy.sCart.Service.ProductService;
import com.caseStudy.sCart.model.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*")
public class MainController
{
    @Autowired
    ProductService prodService;

    @GetMapping("/products")
    public List<Products> getAllProducts() {
        List<Products> list;
        list=prodService.getProductList();
        return list;
    }

    @RequestMapping(value="/product-detail/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Products getProductById(@PathVariable("id") Long id){
        //List<Products> list;
        Products prod;
        prod=prodService.getProductById(id);
        System.out.println(prod.getCategory());
        return prod;
    }

    @RequestMapping(value="/productsFrom/{category}")
    public List<Products> getProductByCategory(@PathVariable("category") String category){
        /*List<Products> list;
        Products prod;
        list= prodService.getProductByCategory(category);
       */
        return prodService.getProductByCategory(category);
    }

    @RequestMapping(value="/products/{category}/{price1}/{price2}",method = RequestMethod.GET)
    public List<Products> getAllProductsByCategoryAndPrice(@PathVariable("category") String category,
                                                           @PathVariable("price1") double price1,
                                                            @PathVariable("price2") double price2){
        return prodService.findAllByCatAndPrice(category,price1,price2);

    }
    @RequestMapping(value="/products/{price1}/{price2}",method = RequestMethod.GET)
    public List<Products> getAllProductsByPrice(@PathVariable("price1") double price1,
                                                           @PathVariable("price2") double price2){
        return prodService.findByPriceOfAll(price1,price2);

    }


    @PostMapping(value="/addproduct")
    @ResponseBody
    public Products addProducts(@RequestBody Products prod){
         return prodService.addProduct(prod);
    }

    @GetMapping("/products/{id}/delete")
    @ResponseBody
    public List<Products> deleteProducts(@PathVariable("id") Long id)
    {
        return prodService.deleteProduct(id);
    }

    @PostMapping(value = "/editProduct",produces = "application/json")
    public Products editCurrentUser(@RequestBody Products products)
    {
        return prodService.editProductDetails(products);
    }

    @GetMapping("/search/{searchedItem}")
    public Set<Products> searchItem(@PathVariable("searchedItem") String searchedItem) {
        Set<Products> prod = prodService.getSearchedData(searchedItem);

        return prod;
    }
}
