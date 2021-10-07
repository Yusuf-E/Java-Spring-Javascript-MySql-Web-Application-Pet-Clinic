package com.works.controllers;

import com.works.entities.Diary;
import com.works.entities.Users;
import com.works.repositories.DiaryRepository;
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
@RequestMapping("/diary")
public class DiaryController {
    private static final Logger log = Logger.getLogger(DiaryController.class);
    final DiaryRepository dRepo;
    final UserRepository uRepo;
    public DiaryController(DiaryRepository dRepo, UserRepository uRepo) {
        this.dRepo = dRepo;
        this.uRepo = uRepo;
    }

    @GetMapping("")
    public String diary(Model model){

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
        return "diary";
    }

    @ResponseBody
    @PostMapping("/add")
    public Diary diaryAdd(@RequestBody Diary diary) {

        return dRepo.save(diary);

    }
    @ResponseBody
    @GetMapping("/list")
    public List<Diary>  diaryList(){
        return dRepo.findAll();
    }
}
