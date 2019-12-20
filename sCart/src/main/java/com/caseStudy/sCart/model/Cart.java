package com.caseStudy.sCart.model;

import javax.persistence.*;

@Entity
public class Cart
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long Id;
    @ManyToOne
    private Products product;
    @ManyToOne
    private Users user;
    @Column
    private int quantity;

    public Cart()
    {

    }
    public Cart(Products product, Users user, int quantity) {
    this.product=product;
    this.user=user;
    this.quantity=quantity;
    }


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
