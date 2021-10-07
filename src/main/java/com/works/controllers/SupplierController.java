package com.works.controllers;


import com.works.entities.Suppliers;
import com.works.entities.Users;
import com.works.repositories.SuppliersRepository;
import com.works.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/suppliers")
public class SupplierController {

    String error ="";
    private static final Logger log = Logger.getLogger(SupplierController.class);
    final UserRepository uRepo;
    final SuppliersRepository sRepo;
    public SupplierController(UserRepository uRepo, SuppliersRepository sRepo) {
        this.uRepo = uRepo;
        this.sRepo = sRepo;
    }


    @GetMapping("")
    public String suppliers(Model model){
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

        return "suppliers";
    }

    @ResponseBody
    @PostMapping("/add")
    public Suppliers addSuppliers ( @RequestBody Suppliers supplier){
        Suppliers s = sRepo.saveAndFlush(supplier);
        return s;
    }

    @ResponseBody
    @GetMapping("/slist")
    public List<Suppliers> list(){
        return sRepo.findAll();
    }

    @ResponseBody
    @GetMapping("/delete/{sid}")
    public String supplierDelete( @PathVariable String sid ){
        try{
            int id = Integer.parseInt(sid);
            sRepo.deleteById(id);
        }catch (Exception ex){
            error = "Silme işlemi sırasında bir hata oluştu!";
        }
        return "supplier";
    }



}
