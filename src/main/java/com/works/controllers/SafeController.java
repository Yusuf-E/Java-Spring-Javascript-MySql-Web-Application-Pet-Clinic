package com.works.controllers;

import com.works.entities.Bill;
import com.works.entities.Users;
import com.works.repositories.BillRepository;
import com.works.repositories.CustomerRepository;
import com.works.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("company-cashier")
public class SafeController {

    private static final Logger log = Logger.getLogger(SafeController.class);

    final BillRepository bRepo;
    final CustomerRepository cRepo;
    final UserRepository uRepo;
    public SafeController(BillRepository bRepo, CustomerRepository cRepo, UserRepository uRepo) {
        this.bRepo = bRepo;
        this.cRepo = cRepo;
        this.uRepo = uRepo;
    }


    @GetMapping("")
    public String lab(Model model) {


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
        return "cashier";
    }

    @ResponseBody
    @GetMapping("/list")
    public List<Bill> billList(){
        return bRepo.findAll();
    }

    @ResponseBody
    @GetMapping("/cashList/{stType}")
    public List<Bill> cashList(@PathVariable String stType){
        List<Bill> ls = new ArrayList<>();

        try {
            int type = Integer.parseInt(stType);
            ls = bRepo.findByPaymenttypeEqualsOrderByDateDesc(type);
        }catch (Exception e){
            System.err.println("cashList Error : " + e);
        }

        return ls;

    }
    @ResponseBody
    @GetMapping("/opeList/{boOpe}")
    public List<Bill> opeList(@PathVariable boolean boOpe){
        List<Bill> ls = new ArrayList<>();

        try {
            ls = bRepo.findByOpestatusEqualsAllIgnoreCaseOrderByDateDesc(boOpe);
        }catch (Exception e){
            System.err.println("opeList Error : " + e);
        }
        return ls;
    }


}

