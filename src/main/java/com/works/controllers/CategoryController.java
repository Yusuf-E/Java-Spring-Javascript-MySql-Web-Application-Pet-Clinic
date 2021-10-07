package com.works.controllers;


import com.works.entities.Category;
import com.works.entities.Users;
import com.works.repositories.CategoryRepository;
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
@RequestMapping("/category")
public class CategoryController {
    private static final Logger log = Logger.getLogger(CategoryController.class);
    final CategoryRepository cRepo;
    final UserRepository uRepo;
    public CategoryController(CategoryRepository cRepo, UserRepository uRepo) {
        this.cRepo = cRepo;
        this.uRepo = uRepo;
    }

    String error ="";

    @GetMapping("")
    public String categories(Model model){
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
        return "category";
    }
    @ResponseBody
    @PostMapping("/add")
    public Category category(@RequestBody Category category){
        Category ctg = cRepo.saveAndFlush(category);
        return ctg;

    }

    @ResponseBody
    @GetMapping("/list")
    public List<Category> list(){
        return cRepo.findAll();
    }

    @ResponseBody
    @GetMapping("/delete/{caid}")
    public String supplierDelete( @PathVariable String caid ){
        try{
            int id = Integer.parseInt(caid);
            cRepo.deleteById(id);
        }catch (Exception ex){
            error = "Silme işlemi sırasında bir hata oluştu!";
        }
        return "category";
    }

}
