package com.works.controllers;


import com.works.entities.Image;
import com.works.entities.Role;
import com.works.entities.Users;
import com.works.repositories.ImageRepository;
import com.works.repositories.RoleRepository;
import com.works.repositories.UserRepository;
import com.works.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Controller
@RequestMapping("/users")
public class UserController {

    String error ="";
    private static final Logger log = Logger.getLogger(UserController.class);

    // config
    private final String UPLOAD_DIR =  "src/main/resources/static/uploads/";
    long maxFileUploadSize = 2048;

    final ImageRepository iRepo;
    final UserRepository uRepo;
    final RoleRepository rRepo;
    final UserService uService;
    public UserController(ImageRepository iRepo, UserRepository uRepo, RoleRepository rRepo, UserService uService) {

        this.iRepo = iRepo;
        this.uRepo = uRepo;
        this.rRepo = rRepo;
        this.uService = uService;
    }

    @GetMapping("")
    public String user(Model model){

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
        return "users";
    }

    @ResponseBody
    @GetMapping("/list")
    public List<Users> usersList(){


        return uRepo.findAll();

    }

    @PostMapping("/update")
    public String userUpdate( Users user ,@RequestParam("utype")String roleID ,@RequestParam("imagename")MultipartFile file ){

        System.out.println(user);
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uPassword = uService.encoder().encode(user.getPassword());
        user.setPassword(uPassword);
        user.setEnabled(true);
        user.setTokenExpired(true);

        if (fileName.equals("")){
            try {
                Users users = uRepo.findById(user.getUid()).get();
                if(users != null){
                    user.setUid(users.getUid());
                    user.setUserimage(users.getUserimage());
                }
                // user role
                int rid = Integer.parseInt(roleID);
                Role role = rRepo.findById(rid).get();
                List<Role> roles = new ArrayList<>();
                roles.add(role);

                user.setRoles(roles);

                if(user.getUserstatus() == null){
                    user.setUserstatus("Pasif");
                }else {
                    user.setUserstatus("Aktif");
                }


                Users u = uRepo.saveAndFlush(user);
            }catch (Exception ex){
                ex.printStackTrace();
            }
        }
        else {
        String ext = fileName.substring(fileName.length()-4, fileName.length());
        String uui = UUID.randomUUID().toString();
        fileName = uui + ext;

            try {

                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                Users users = uRepo.findById(user.getUid()).get();
                if(users != null){
                    user.setUid(users.getUid());
                    user.setUserimage(users.getUserimage());

                }
                // user role

                int rid = Integer.parseInt(roleID);
                Role role = rRepo.findById(rid).get();
                List<Role> roles = new ArrayList<>();
                roles.add(role);

                user.setRoles(roles);

                if(user.getUserstatus() == null){
                    user.setUserstatus("Pasif");
                }else {
                    user.setUserstatus("Aktif");
                }
                System.out.println("userUID : " + user.getUid());
                if(user.getUid() != null){

                    File fileimage = new File(UPLOAD_DIR + user.getUserimage().getImagename());
                    if (fileimage.exists()) {
                        fileimage.delete();
                    }
                    Image i = new Image();
                    i.setImagename(fileName);
                    i.setIid(user.getUserimage().getIid());
                    Image ii = iRepo.saveAndFlush(i);


              //  iRepo.deleteById(user.getUserimage().getIid());

                    user.setUserimage(ii);
                }
                Users u = uRepo.saveAndFlush(user);
            }catch (Exception ex){
                ex.printStackTrace();
            }
        }

        return "redirect:/logout";


    }

    @PostMapping("/add")
    public String addUser( Users user ,@RequestParam(value = "utype",defaultValue = "1")String roleID ,@RequestParam("imagename")MultipartFile file ){
        // Image
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = fileName.substring(fileName.length()-4, fileName.length());
        String uui = UUID.randomUUID().toString();
        fileName = uui + ext;
        try {
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase(user.getUseremail());
            if(ou.isPresent()){
                user.setUid(ou.get().getUid());
                user.setUserimage(ou.get().getUserimage());

            }
            // user role

            user.setEnabled(true);
            user.setTokenExpired(true);


            int rid = Integer.parseInt(roleID);
            Role role = rRepo.findById(rid).get();
            List<Role> roles = new ArrayList<>();
            roles.add(role);

            user.setRoles(roles);


            if(user.getUserstatus() == null){
                user.setUserstatus("Pasif");
            }else {
                user.setUserstatus("Aktif");
            }
            System.out.println("userUID : " + user.getUid());

            if(user.getUid() != null){

                File fileimage = new File(UPLOAD_DIR + user.getUserimage().getImagename());
                if (fileimage.exists()) {
                    fileimage.delete();
                }

                Image i = new Image();
                i.setImagename(fileName);
                i.setIid(user.getUserimage().getIid());
                Image ii = iRepo.saveAndFlush(i);


/*
                iRepo.deleteById(user.getUserimage().getIid());
*/
                user.setUserimage(ii);
            }else{

                Image i = new Image();
                i.setImagename(fileName);
                Image ii = iRepo.save(i);
                user.setUserimage(ii);

            }

            uService.register(user);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return "redirect:/users";
    }

    @ResponseBody
    @GetMapping("delete/{uid}")
    public String userDelete( @PathVariable String uid){
        try {

            int id = Integer.parseInt(uid);
            Users user = uRepo.findById(id).get();

            File fileimage = new File(UPLOAD_DIR + user.getUserimage().getImagename());
            if (fileimage.exists()) {
                fileimage.delete();
            }

            uRepo.deleteById(id);
        }catch (Exception ex){
            error = "Silme işlemi sırasında bir hata oluştu!";
        }
        return "users";
    }



  /*  // image upload fnc
    @PostMapping("/imageUpload")
    public String imageUpload(@RequestParam("userimagename")MultipartFile file){

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = fileName.substring(fileName.length()-4, fileName.length());
        String uui = UUID.randomUUID().toString();
        fileName = uui + ext;
        try {
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Image i = new Image();
        i.setImagename(fileName);

        Image ii = iRepo.save(i);

        return "redirect:/"+PId;
    }*/



}
