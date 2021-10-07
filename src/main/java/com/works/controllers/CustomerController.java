package com.works.controllers;

import com.works.entities.*;
import com.works.properties.CustomerLayer;
import com.works.properties.CustomerPetsInlayer;
import com.works.properties.PetLayer;
import com.works.repositories.*;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping("/customer")
public class CustomerController {
    private static final Logger log = Logger.getLogger(CustomerController.class);
    String error ="";
    Customer customerUpdate = new Customer();

    final CustomerRepository cRepo;
    final PetRepository pRepo;
    final PetColorRepository pcRepo;
    final PetRaceRepository prRepo;
    final UserRepository uRepo;

    public CustomerController(CustomerRepository cRepo, PetRepository pRepo, PetColorRepository pcRepo, PetRaceRepository prRepo, UserRepository uRepo) {
        this.cRepo = cRepo;
        this.pRepo = pRepo;
        this.pcRepo = pcRepo;
        this.prRepo = prRepo;
        this.uRepo = uRepo;
    }
    @GetMapping("")
    public String customer(Model model)
    {

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
        return "customerAdd";
    }

    @ResponseBody
    @PostMapping("/update")
    public Customer updateCustomer(@RequestBody CustomerLayer cusLayer){
        System.out.println(cusLayer);
        Customer customer = new Customer();
        Customer c = new Customer();
        try {

            customer = cRepo.findById(cusLayer.getCid()).get();
            customer.setCname(cusLayer.getCname());
            customer.setCsurname(cusLayer.getCsurname());
            customer.setMobile_phone(cusLayer.getMobile_phone());
            customer.setEmail(cusLayer.getEmail());
            customer.setTax(cusLayer.getTax());
            customer.setTax_administration(cusLayer.getTax_administration());
            customer.setCtype(cusLayer.getCtype());
            customer.setCnote(cusLayer.getCnote());
            customer.setCprovince(cusLayer.getCprovince());
            customer.setCdistrict(cusLayer.getCdistrict());
            customer.setCaddress(cusLayer.getCaddress());
            customer.setCdiscount(cusLayer.getCdiscount());

            c = cRepo.saveAndFlush(customer);
        }catch (Exception e){
            System.err.println("Customer Update Error : " + e);
        }
        return c;
    }



    @ResponseBody
    @PostMapping("/add")
    public Customer addCustomer(@RequestBody CustomerPetsInlayer cusLayer){
        PetRace petRace;
        PetColor petColor;
        Customer customer = new Customer();


        List<Pet> pets = new ArrayList<>();



            for (PetLayer layer : cusLayer.getPets()) {
                Pet pet = new Pet();
                petRace = prRepo.findById(layer.getCrace()).get();
                petColor = pcRepo.findById(layer.getCcolor()).get();

                pet.setCpatient(layer.getCpatient());
                pet.setCchip(layer.getCchip());
                pet.setCreport(layer.getCreport());
                pet.setCbirth(layer.getCbirth());
                pet.setCkind(layer.getCkind());
                pet.setCgender(layer.getCgender());
                pet.setCbarren(layer.getCbarren());
                pet.setPColor(petColor);
                pet.setPRace(petRace);

                pRepo.saveAndFlush(pet);
                pets.add(pet);


            }


            customer.setCname(cusLayer.getCus().getCname());
            customer.setCsurname(cusLayer.getCus().getCsurname());
            customer.setMobile_phone(cusLayer.getCus().getMobile_phone());
            customer.setEmail(cusLayer.getCus().getEmail());
            customer.setTax(cusLayer.getCus().getTax());
            customer.setTax_administration(cusLayer.getCus().getTax_administration());
            customer.setCtype(cusLayer.getCus().getCtype());
            customer.setCnote(cusLayer.getCus().getCnote());
            customer.setCprovince(cusLayer.getCus().getCprovince());
            customer.setCdistrict(cusLayer.getCus().getCdistrict());
            customer.setCaddress(cusLayer.getCus().getCaddress());
            customer.setCdiscount(cusLayer.getCus().getCdiscount());
            customer.setPets(pets);

            Customer c = cRepo.saveAndFlush(customer);
            return c;

    }

    @GetMapping("/list")
    public String searchCustomer(Model model){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        model.addAttribute("userImage",ou.get().getUserimage().getImagename());
        model.addAttribute("useremail",currentPrincipalName );



        return "customerList";
    }

    @ResponseBody
    @GetMapping("/clist")
    public List<Customer> list(){
        return cRepo.findAll();
    }

    @ResponseBody
    @GetMapping("/search/{data}")
    public List<Customer> search(@PathVariable String data) {
        List<Customer> ls = cRepo.findByCnameContainsIgnoreCaseOrCsurnameContainsIgnoreCaseAllIgnoreCaseOrderByCnameAsc(data,data);
        System.out.println(ls);
        return ls;
    }

    @ResponseBody
    @PostMapping("/petAdd")
    public Pet addPet(@RequestBody Pet pet){



        Pet  p = pRepo.save(pet);

        return p;
    }

    @ResponseBody
    @PostMapping("/addColor")
    public PetColor addColor(@RequestBody PetColor petColor){
        PetColor pc = pcRepo.save(petColor);
        return pc;
    }

    @ResponseBody
    @PostMapping("/addRace")
    public PetRace addRace(@RequestBody PetRace petRace){
        PetRace pr = prRepo.save(petRace);
        return pr;

    }
    @ResponseBody
    @GetMapping("/races")
    public List<PetRace> listRaces( ){
       List<PetRace> prc = prRepo.findAll();
        return prc;

    }
    @ResponseBody
    @GetMapping("/colors")
    public List<PetColor> listColors( ){
        List<PetColor> pcc = pcRepo.findAll();
        return pcc;
    }

    @ResponseBody
    @GetMapping("/delete/{cid}")
    public String customerDelete( @PathVariable String cid ){
        try{
            int id = Integer.parseInt(cid);
            cRepo.deleteById(id);
        }catch (Exception ex){
            error = "Silme işlemi sırasında bir hata oluştu!";
        }
        return "customerList";

    }









}
