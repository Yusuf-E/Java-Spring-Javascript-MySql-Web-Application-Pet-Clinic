package com.works.controllers;

import com.works.entities.Customer;
import com.works.entities.Users;
import com.works.repositories.CustomerRepository;
import com.works.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/lab-detail")
public class LabListController {

    final CustomerRepository cRepo;
    final UserRepository uRepo;
    private static final Logger log = Logger.getLogger(LabListController.class);

    public LabListController(CustomerRepository cRepo, UserRepository uRepo) {
        this.cRepo = cRepo;
        this.uRepo = uRepo;
    }

    @GetMapping("")
    public  String detail(Model model) {


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
        return "lab_customer_detail";
    }

    @ResponseBody
    @GetMapping("/listt")
    public List<Customer> listdetail(){

        return cRepo.findAll();
    }
}
