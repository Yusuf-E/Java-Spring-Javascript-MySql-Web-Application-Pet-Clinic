package com.works.controllers;

import com.works.entities.Bill;
import com.works.entities.Lab;
import com.works.entities.Users;
import com.works.repositories.BillRepository;
import com.works.repositories.LabRepository;
import com.works.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {

    private static final Logger log = Logger.getLogger(StatisticsController.class);

    final LabRepository lRepo;
    final BillRepository bRepo;
    final UserRepository uRepo;
    public StatisticsController(LabRepository lRepo, BillRepository bRepo, UserRepository uRepo) {
        this.lRepo = lRepo;
        this.bRepo = bRepo;
        this.uRepo = uRepo;
    }


    @GetMapping("")
    public String statistics(Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        model.addAttribute("userImage",ou.get().getUserimage().getImagename());
        model.addAttribute("useremail",currentPrincipalName );


        log.debug("debug message");
        log.error("error message");
        log.trace("trace message");
        log.info("info message");
        log.warn("warn message");
        return "statistics";
    }

    @ResponseBody
    @GetMapping("countDate")
    public Long countDate(){

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Date end_date = Date.from( endDate.atStartOfDay(defaultZoneId).toInstant() );
        Date start_date = Date.from( startDate.atStartOfDay(defaultZoneId).toInstant() );

        Long count = lRepo.countByDateBetween(start_date,end_date);
        System.out.println(count);
        return count;
    }

    @ResponseBody
    @GetMapping("weeklyCus")
    public List<Lab> weeklyCus(){
        List<Lab> ls = new ArrayList<>();
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(5);
        endDate = endDate.plusDays(1);
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Date end_date = Date.from( endDate.atStartOfDay(defaultZoneId).toInstant() );
        Date start_date = Date.from( startDate.atStartOfDay(defaultZoneId).toInstant() );

        ls = lRepo.findByDateBetweenOrderByDateDesc(start_date,end_date);

        return ls;
    }

    @ResponseBody
    @GetMapping("weeklyCuslist")
    public List<Bill> weeklyCusList(){
        List<Bill> ls = new ArrayList<>();
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(5);
        endDate = endDate.plusDays(1);
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Date end_date = Date.from( endDate.atStartOfDay(defaultZoneId).toInstant() );
        Date start_date = Date.from( startDate.atStartOfDay(defaultZoneId).toInstant() );

        ls = bRepo.findByDateBetweenAndOpestatusEqualsAllIgnoreCaseOrderByAmountDesc(start_date,end_date,false);
        return ls;
    }





}
