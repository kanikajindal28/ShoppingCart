package com.caseStudy.sCart.Service;

import com.caseStudy.sCart.model.Products;
import com.caseStudy.sCart.repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class ProductService {
    @Autowired
    productRepository prepo;

    public List<Products> getProductList() {
        System.out.println(prepo.findAll());
        return prepo.findAll();
    }

    public Products getProductById(Long id) {

        return prepo.findById(id).orElse(new Products());
    }
    public Products addProduct(Products p) {

        return prepo.save(p);
    }

    public List<Products> deleteProduct(Long id)
    {
        prepo.deleteById(id);
        return prepo.findAll();
    }

    public List<Products> getProductByCategory(String category)
    {

        return  prepo.findAllByCategory(category);

    }



    public List<Products> findAllByCatAndPrice(String category, double price1, double price2)
    {
        return prepo.findByCategoryAndPriceBetween(category,price1,price2);
    }

    public List<Products> findByPriceOfAll(double price1, double price2) {
        return  prepo.findByPriceBetween(price1,price2);
    }

    public Products editProductDetails(Products products)
    {
        Products oldProd = prepo.findByProductId(products.getProductId());
        oldProd.setProductId(products.getProductId());
        oldProd.setName(products.getName());
        oldProd.setCategory(products.getCategory());
        oldProd.setDetails(products.getDetails());
        oldProd.setImage(products.getImage());
        oldProd.setPrice(products.getPrice());
        prepo.saveAndFlush(oldProd);
        return oldProd;
    }

    public Set<Products> getSearchedData(String searchedItem)
    {
        List<Products> productsList = prepo.findAll();
        Set<Products> result = new HashSet<>();

        for(int i=0; i<productsList.size(); i++) {
            if(productsList.get(i).getName().toLowerCase().contains(searchedItem.toLowerCase()) ||
                    productsList.get(i).getCategory().toLowerCase().contains(searchedItem.toLowerCase()) ||
                    productsList.get(i).getDetails().toLowerCase().contains(searchedItem.toLowerCase())) {

                result.add(productsList.get(i));
            }
        }
        return result;
    }
}
