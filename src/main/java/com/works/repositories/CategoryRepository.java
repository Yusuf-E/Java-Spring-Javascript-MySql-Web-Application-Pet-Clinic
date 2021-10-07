package com.works.repositories;

import com.works.entities.Category;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
