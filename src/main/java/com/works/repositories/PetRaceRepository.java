package com.works.repositories;

import com.works.entities.PetRace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRaceRepository extends JpaRepository<PetRace, Integer> {
}
