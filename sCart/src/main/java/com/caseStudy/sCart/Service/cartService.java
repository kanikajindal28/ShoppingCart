package com.caseStudy.sCart.Service;

import com.caseStudy.sCart.model.Cart;
import com.caseStudy.sCart.model.Products;
import com.caseStudy.sCart.model.Users;
import com.caseStudy.sCart.model.orderHistory;
import com.caseStudy.sCart.repository.cartRepository;
import com.caseStudy.sCart.repository.orderHistoryRepository;
import com.caseStudy.sCart.repository.productRepository;
import com.caseStudy.sCart.repository.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Service
public class cartService
{
    @Autowired
    productRepository prepo;

    @Autowired
    userRepo urepo;

    @Autowired
    cartRepository crepo;

    @Autowired
    orderHistoryRepository orepo;

    public Cart addProduct(Long userId, Long productId)
    {
        Products product = prepo.findByProductId(productId);
        Users user = urepo.findByUserId(userId);

        if(crepo.findByUserAndProduct(user,product)!=null)
        {
            Cart cart = (Cart) crepo.findByUserAndProduct(user,product);
            cart.setQuantity(cart.getQuantity()+1);
            crepo.save(cart);
        }
        else
        {
            Cart c = new Cart(product,user,1);
            crepo.save(c);
        }
        return (Cart) crepo.findByUserAndProduct(user,product);
    }

   public List<Cart> showcart(Long userId)
    {
        Users user = urepo.findByUserId(userId);
        return  crepo.findByUser(user);
    }

    /*public void emptycart(Long userId) {
        Users user = urepo.findByUserId(userId);
        List<Cart> cartItems = crepo.findByUser(user);
        for(Cart c : cartItems)
        {
            crepo.deleteById(c.getId());
        }

    }*/
    public String removeProduct(Long userId, Long productId) {
        Products products = prepo.findByProductId(productId);
        Users users = urepo.findByUserId(userId);
        crepo.deleteAllByUserAndProduct(users, products);
        return "removed";
    }

   /* public void removeFromCart(Long userId, Long cartId)
    {
        Users user = urepo.findByUserId(userId);
        List<Cart> cartItems = crepo.findByUser(user);
        for(Cart c : cartItems)
        {
            if(c.getId()==cartId)
            crepo.deleteById(cartId);
        }
    }*/

    public Cart subtractProduct(Long userId, Long productId) {

        Products products = prepo.findByProductId(productId);

        Users users = urepo.findByUserId(userId);

        if(crepo.findByUserAndProduct(users, products)!=null) {

            Cart cart = (Cart) crepo.findByUserAndProduct(users, products);
            if(cart.getQuantity()>=2) {
                cart.setQuantity(cart.getQuantity() - 1);
                crepo.save(cart);
            } else if(cart.getQuantity()==1) {
                removeProduct(userId, productId);
            }
        }
        return (Cart) crepo.findByUserAndProduct(users, products);
    }

    public List<orderHistory> checkout(Principal principal)
    {
        Users user = urepo.getByEmail(principal.getName());
        ArrayList<Cart> cartList = (ArrayList<Cart>) crepo.findByUser(user);
        for(Cart cart : cartList)
        {
            orderHistory ohistory = new orderHistory();
            ohistory.setItemName(cart.getProduct().getName());
            ohistory.setUserId(cart.getUser().getUserId());
            ohistory.setQuantity(cart.getQuantity());
            ohistory.setPrice(cart.getProduct().getPrice());
            ohistory.setImage(cart.getProduct().getImage());
            ohistory.setDate(new Date());
            ohistory.setProductId(cart.getProduct().getProductId());
            crepo.delete(cart);
            orepo.saveAndFlush(ohistory);
        }
        return orepo.findAllByUserId(user.getUserId());
    }
}
