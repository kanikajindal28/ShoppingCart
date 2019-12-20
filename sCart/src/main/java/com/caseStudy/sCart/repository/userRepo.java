package com.caseStudy.sCart.repository;

import com.caseStudy.sCart.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepo extends JpaRepository<Users,Long>
{
     Users findByEmailAndPassword(String email,String password);
     Users findByUserId(Object principal);
     Users findByEmail(String email);

    Users getByEmail(String name);
}
