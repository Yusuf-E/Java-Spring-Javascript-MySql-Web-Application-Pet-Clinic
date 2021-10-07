package com.works.repositories;

import com.works.entities.BoxAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoxRepository extends JpaRepository<BoxAction , Integer> {
    List<BoxAction> findBySuidEqualsAllIgnoreCase(Integer suid);


}
