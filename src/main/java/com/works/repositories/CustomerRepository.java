package com.works.repositories;

import com.works.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByCnameContainsIgnoreCaseAllIgnoreCaseOrderByCidAsc(String cname);

    @Query("select c from Customer c where upper(c.cname) like upper(concat('%', ?1, '%')) or upper(c.csurname) like upper(concat('%', ?2, '%')) order by c.cname")
    List<Customer> findByCnameContainsIgnoreCaseOrCsurnameContainsIgnoreCaseAllIgnoreCaseOrderByCnameAsc(String cname, String csurname);








}
