package com.caseStudy.sCart.repository;

import com.caseStudy.sCart.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.Principal;
import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*")
public interface productRepository extends JpaRepository<Products, Long>
{
    List<Products> findAllByCategory(String category);
    List<Products> findByCategoryAndPriceBetween(String category,double price1,double price2);
    List<Products> findByPriceBetween(double price1,double price2);

    Products findByProductId(Object principal);
}
