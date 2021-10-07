package com.works.controllers;

import com.works.entities.Image;
import com.works.entities.Lab;
import com.works.entities.Pet;
import com.works.entities.Users;
import com.works.repositories.ImageRepository;
import com.works.repositories.LabRepository;
import com.works.repositories.PetRepository;
import com.works.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("patientDetail")
public class PatientDetailController {

    private final String UPLOAD_DIR =  "src/main/resources/static/uploads/labImage/";
    final PetRepository pRepo;
    final LabRepository lRepo;
    final ImageRepository iRepo;
    final UserRepository uRepo;
    private static final Logger log = Logger.getLogger(PatientDetailController.class);

    public PatientDetailController(PetRepository pRepo, LabRepository lRepo, ImageRepository iRepo, UserRepository uRepo) {
        this.pRepo = pRepo;
        this.lRepo = lRepo;
        this.iRepo = iRepo;
        this.uRepo = uRepo;
    }

    @GetMapping("")
    public String patientDetail(Model model){

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

        return "patient-detail";
    }


    @GetMapping("/list/{stPid}")
    public String patientlist(@PathVariable String stPid, Model modal){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        modal.addAttribute("userImage",ou.get().getUserimage().getImagename());
        modal.addAttribute("useremail",currentPrincipalName );



        Pet pet = new Pet();
        Lab lab = new Lab();
        try{
            int pid = Integer.parseInt(stPid);
            pet = pRepo.findById(pid).get();
            modal.addAttribute("pet", pet);



        }catch (Exception ex){
            System.err.println("Catch Calıstı");
        }

        return "patient-detail";
    }

    @PostMapping("/lab")
    public String addUser(Lab lab , @RequestParam(value= "petID")Integer petID, @RequestParam("imagename") MultipartFile file ) {

        System.out.println("lab:"+ lab);
        System.out.println("PetId :"+ petID);
        // Image
        String imagename = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = imagename.substring(imagename.length() - 4, imagename.length());
        String uui = UUID.randomUUID().toString();
        imagename = uui + ext;
        try {
            Path path = Paths.get(UPLOAD_DIR + imagename);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Pet pet = new Pet();

        try{
            pet  = pRepo.findById(petID).get();
            lab.setPet(pet);

            Image i = new Image();
            i.setImagename(imagename);
            Image ii = iRepo.save(i);
            lab.setLabimage(ii);



        }catch (Exception ex){

        }
        lRepo.save(lab);

        return "redirect:/patientDetail/list/"+pet.getPid();
    }

    @ResponseBody
    @GetMapping("/list/result/{stPid}")
    public List<Lab> labsonuc(@PathVariable String stPid){
        List<Lab> ls = new ArrayList<>();
        try{
            int pid = Integer.parseInt(stPid);
             ls = lRepo.findByPet_PidEqualsAllIgnoreCaseOrderByLidDesc(pid);

        }catch (Exception ex){

        }

        return ls;
    }
}
