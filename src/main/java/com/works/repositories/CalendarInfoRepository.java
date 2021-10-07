package com.works.repositories;

import com.works.entities.CalendarInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface CalendarInfoRepository extends JpaRepository<CalendarInfo, Integer> {


}
