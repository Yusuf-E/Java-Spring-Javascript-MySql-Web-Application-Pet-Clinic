package com.works.repositories;

import com.works.entities.PetColor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetColorRepository extends JpaRepository<PetColor, Integer> {
}
