package com.works.controllers;


import com.works.entities.Users;
import com.works.repositories.ImageRepository;
import com.works.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class DashboardController {
    private static final Logger log = Logger.getLogger(DiaryController.class);

    final ImageRepository iRepo;
    final UserRepository uRepo;
    public DashboardController(ImageRepository iRepo, UserRepository uRepo) {
        this.iRepo = iRepo;
        this.uRepo = uRepo;
    }

    @GetMapping("")
    public String dashboard(Model model){
        log.debug("debug message");
        log.error("error message");
        log.trace("trace message");
        log.info("info message");
        log.warn("warn message");


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        model.addAttribute("userImage",ou.get().getUserimage().getImagename());
        model.addAttribute("useremail",currentPrincipalName );


        return "statistics";
    }



}
