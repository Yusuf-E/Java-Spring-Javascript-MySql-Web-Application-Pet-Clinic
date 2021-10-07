package com.works.repositories;

import com.works.entities.Lab;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface LabRepository extends JpaRepository<Lab, Integer> {
    List<Lab> findByPet_PidEqualsAllIgnoreCaseOrderByLidDesc(Integer pid);

    Optional<Lab> findByPet_PidEqualsAllIgnoreCase(Integer pid);

    long countByDateBetween(Date dateStart, Date dateEnd);

    List<Lab> findByDateBetweenOrderByDateDesc(Date dateStart, Date dateEnd);





}
