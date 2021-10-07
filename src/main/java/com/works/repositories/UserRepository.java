package com.works.repositories;

import com.works.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Integer> {

    Optional<Users> findByUseremailEqualsIgnoreCaseAllIgnoreCase(String useremail);



}
