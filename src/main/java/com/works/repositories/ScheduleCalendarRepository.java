package com.works.repositories;

import com.works.entities.ScheduleCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleCalendarRepository extends JpaRepository<ScheduleCalendar, Integer> {

    List<ScheduleCalendar> findByCalendarIdEquals(String calendarId);



}
