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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Controller
public class LabController {
    private static final Logger log = Logger.getLogger(LabController.class);
    final CustomerRepository cRepo;
    final UserRepository uRepo;
    public LabController(CustomerRepository cRepo, UserRepository uRepo) {
        this.cRepo = cRepo;
        this.uRepo = uRepo;
    }

    @GetMapping("/lab-customer")
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
        return "lab";
    }

    @ResponseBody
    @GetMapping("/lab-list")
    public List<Customer> list(){

        return cRepo.findAll();
    }

    @GetMapping("/lab-detail/{stCid}")
    public String labSend(@PathVariable String stCid, Model modal){


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        modal.addAttribute("userImage",ou.get().getUserimage().getImagename());
        modal.addAttribute("useremail",currentPrincipalName );




        Customer customer = new Customer();
        try{
            int cid = Integer.parseInt(stCid);
          customer = cRepo.findById(cid).get();
            modal.addAttribute("customer", customer);


        }catch (Exception ex){

        }

        return "lab_customer_detail";
    }








}
