package com.works.controllers;

import com.works.entities.Users;
import com.works.entities.WareHouse;
import com.works.repositories.UserRepository;
import com.works.repositories.WareHouseRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/warehouse")
public class WarehouseController {

    private static final Logger log = Logger.getLogger(WarehouseController.class);
    final WareHouseRepository wRepo;
    final UserRepository uRepo;
    public WarehouseController(WareHouseRepository wRepo, UserRepository uRepo) {
        this.wRepo = wRepo;
        this.uRepo = uRepo;
    }


    @GetMapping("")
    public String warehouse(Model model) {

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



        return "warehouse";
    }

    @ResponseBody
    @PostMapping("/add")
    public WareHouse category(@RequestBody WareHouse wareHouse){
        WareHouse wh = new WareHouse();
        try {
             wh = wRepo.saveAndFlush(wareHouse);
        }catch (Exception e){
            System.err.println("WarehouseAdd Error : " + e);
        }
        return wh;

    }

    @ResponseBody
    @GetMapping("/list")
    public List<WareHouse> list(){
        return wRepo.findAll();
    }

}
