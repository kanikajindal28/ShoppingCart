package com.caseStudy.sCart.controller;

import com.caseStudy.sCart.Service.UserService;
import com.caseStudy.sCart.Service.cartService;
import com.caseStudy.sCart.model.Cart;
import com.caseStudy.sCart.model.orderHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*")
public class CartController
{
    @Autowired
    cartService cService;

    @Autowired
    UserService uService;

    @GetMapping(value = "/addtocart/{productid}")
    public Cart addtocart(@PathVariable Long productid, Principal principal)
    {
        return cService.addProduct(uService.getUserId(principal),productid);
    }

    @GetMapping(value = "/showcart")
    public List<Cart> showcart(Principal principal)
    {
        return cService.showcart(uService.getUserId(principal));
    }

    @GetMapping(value = "/removeFromcart/{productId}" )
    public String removeFrom(@PathVariable Long productId,Principal principal)
    {
        cService.removeProduct(uService.getUserId(principal),productId);
        return "\"removed\"";
    }

    @GetMapping("/decreseQuantity/{productId}")
    public String decreaseQuantity(@PathVariable Long productId,Principal principal)
    {
        cService.subtractProduct(uService.getUserId(principal),productId);
        return "\"quantity decreased\"";
    }

    @GetMapping(value="/checkout" ,produces="application/json")
    public List<orderHistory> checkout(Principal principal)
    {
        return cService.checkout(principal);
    }
}
