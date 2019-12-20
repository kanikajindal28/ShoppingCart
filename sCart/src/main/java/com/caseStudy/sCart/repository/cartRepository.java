package com.caseStudy.sCart.repository;

import com.caseStudy.sCart.model.Cart;
import com.caseStudy.sCart.model.Products;
import com.caseStudy.sCart.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface cartRepository extends JpaRepository<Cart,Long>
{

    Object findByUserAndProduct(Users user, Products product);

    List<Cart> findByUser(Users user);
    Cart findByProduct(Products products);

    void deleteById(Long id);

    void deleteByProduct(Products product) ;

    void deleteAllByUserAndProduct(Users users, Products products);
}
