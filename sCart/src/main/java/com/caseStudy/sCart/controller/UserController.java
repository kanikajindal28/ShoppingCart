package com.caseStudy.sCart.controller;

import com.caseStudy.sCart.Service.UserService;
import com.caseStudy.sCart.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*")
public class UserController
{
    @Autowired
    UserService userS;

    @GetMapping(path = "/validateLogin" , produces = "application/json")
    public String validateLogin()
    {
        return "\"valid\"";
    }

    @PostMapping(value = "/addUsers",produces = "application/json")
    public Users addUser(@RequestBody  Users user)
    {
        user.setRole("customer");
        userS.addUser(user);
        return user ;
    }

    @RequestMapping(value="/logout",method = RequestMethod.GET)
    public String logout(HttpServletRequest request, HttpServletResponse response)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        if(auth!=null)
        {
            new SecurityContextLogoutHandler().logout(request,response,auth);
            request.getSession().invalidate();
        }
        return "/home";
    }

    @GetMapping(value = "/getuser")
    public Users getCurrentUser(Principal principal)
    {
        return userS.getUsersProfile(principal);
    }

    @PostMapping(value = "/edituser",produces = "application/json")
    public Users editCurrentUser(@RequestBody Users user)
    {
        return userS.editUsersProfile(user);
    }
}
