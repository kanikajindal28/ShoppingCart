package com.caseStudy.sCart.repository;

import com.caseStudy.sCart.model.orderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface orderHistoryRepository extends JpaRepository<orderHistory,Long>
{
    List<orderHistory> findAllByUserId(Long id);
}
