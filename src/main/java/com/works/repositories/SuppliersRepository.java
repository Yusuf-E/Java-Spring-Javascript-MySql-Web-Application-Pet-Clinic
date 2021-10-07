package com.works.repositories;

import com.works.entities.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuppliersRepository extends JpaRepository<Suppliers,Integer> {
}
