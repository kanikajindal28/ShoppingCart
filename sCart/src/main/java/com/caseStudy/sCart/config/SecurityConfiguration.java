package com.caseStudy.sCart.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{
    @Autowired
    private DataSource dataSource;

    @Autowired
    public void globalSecurityConfig(AuthenticationManagerBuilder auth) throws Exception
    {
       auth.
               jdbcAuthentication().dataSource(dataSource)
               .usersByUsernameQuery("select email,password,active from users where email = ?")
               .authoritiesByUsernameQuery("select email,role from users where email = ?");
    }

@Override
    protected void configure(HttpSecurity http)throws Exception
    {
        http.csrf().disable()
                .authorizeRequests().antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers("/addUsers").permitAll()
                .antMatchers("/products").permitAll()
                .antMatchers("/products/{price1}/{price2}").permitAll()
                .antMatchers("/products/{category}/{price1}/{price2}").permitAll()
                .antMatchers("/productsFrom/{category}").permitAll()
                .antMatchers("/product-detail/{id}").permitAll()
                .antMatchers("/search/{searchedItem}").permitAll()
                .anyRequest().authenticated().and().httpBasic();

        http.cors();
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return NoOpPasswordEncoder.getInstance();
    }

   /* @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth )throws Exception
    {
        auth.inMemoryAuthentication().withUser("kanikajindal00@gmail.com").password("{noop}password").roles("USER");
    }*/
}
