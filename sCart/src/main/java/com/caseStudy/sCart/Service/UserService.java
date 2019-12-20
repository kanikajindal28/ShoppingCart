package com.caseStudy.sCart.Service;

import com.caseStudy.sCart.model.Users;
import com.caseStudy.sCart.repository.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class UserService
{
    @Autowired
    private userRepo urepo;

    public Long getUserId(Principal principal)
    {
        String email = principal.getName();
        Long id = urepo.findByEmail(email).getUserId();
        return id;
    }

    public Users getUsersProfile(Principal principal)
    {
        return urepo.findByEmail(principal.getName());
    }


    public Users getUserByEmailAndPassword(String email,String password)
    {
        return urepo.findByEmailAndPassword(email,password);
    }

    public String addUser(Users user)
    {
         urepo.save(user);
         return "added";
    }

    public Users findByEmail(String email)
    {
        return urepo.findByEmail(email);
    }

    public Users editUsersProfile(Users users)
    {
        Users oldUser = urepo.findByUserId(users.getUserId());
        oldUser.setUserId(users.getUserId());
        oldUser.setName(users.getName());
        oldUser.setEmail(users.getEmail());
        oldUser.setMobileNo(users.getMobileNo());
        oldUser.setPassword(users.getPassword());
        oldUser.setAddress(users.getAddress());
        urepo.saveAndFlush(oldUser);
        return oldUser;
    }
}
