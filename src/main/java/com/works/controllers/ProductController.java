package com.works.controllers;

import com.works.entities.*;
import com.works.properties.ProductLayer;
import com.works.repositories.*;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/product")
public class ProductController {

    String error ="";
    private static final Logger log = Logger.getLogger(ProductController.class);
    final CategoryRepository cRepo;
    final SuppliersRepository sRepo;
    final ProductRepository pRepo;
    final ProductStockRepository psRepo;
    final UserRepository uRepo;
    public ProductController(CategoryRepository cRepo, SuppliersRepository sRepo, ProductRepository pRepo, ProductStockRepository psRepo, UserRepository uRepo) {

        this.cRepo = cRepo;
        this.sRepo = sRepo;
        this.pRepo = pRepo;
        this.psRepo = psRepo;
        this.uRepo = uRepo;
    }


    @GetMapping("")
    public  String pList(Model model) {

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
        return "productList";
    }

    @ResponseBody
    @GetMapping("/plist")
    public  List<Product> productList() {
        return pRepo.findAll();
    }

    @GetMapping("/vlist")
    public  String vList() {
        return "vaccineList";
    }

    @GetMapping("/detail")
    public  String detail(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        model.addAttribute("userImage",ou.get().getUserimage().getImagename());
        model.addAttribute("useremail",currentPrincipalName );



        return "productDetail";
    }

    @ResponseBody
    @PostMapping("/add")
    public Product add(@RequestBody ProductLayer productLayer){
        System.out.println(productLayer);
        Product p = new Product();

        Product product = new Product();
        Category category = new Category();
        Suppliers suppliers = new Suppliers();
        try{
            category = cRepo.findById(productLayer.getProductcategory()).get();
            suppliers = sRepo.findById(productLayer.getProductsuppliers()).get();

            product.setProductname(productLayer.getProductname());
            product.setProductunit(productLayer.getProductunit());
            product.setProducttype(productLayer.getProducttype());
            product.setProductbarcode(productLayer.getProductbarcode());
            product.setProductcode(productLayer.getProductcode());
            product.setProducttax(productLayer.getProducttax());
            product.setBuyprice(productLayer.getBuyprice());
            product.setSellprice(productLayer.getSellprice());
            product.setCriticalquantity(productLayer.getCriticalquantity());
            product.setProductstatus(productLayer.getProductstatus());
            product.setPspki(productLayer.getPspki());
            product.setPbpki(productLayer.getPbpki());
            product.setProductsuppliers(suppliers);
            product.setProductcategory(category);

           p = pRepo.save(product);

            System.out.println(product);
        }catch (Exception e){

        }
        return p;
    }


    @ResponseBody
    @GetMapping("delete/{stPid}")
    public String productDelete( @PathVariable String stPid){
        try {
            int id = Integer.parseInt(stPid);
            pRepo.deleteById(id);
        }catch (Exception ex){
            error = "Silme işlemi sırasında bir hata oluştu!";
        }
        return "product";
    }

    @ResponseBody
    @GetMapping("/search/{data}")
    public List<Product> search(@PathVariable String data){
        List<Product> ls = pRepo.findByProductnameContainsIgnoreCaseAllIgnoreCaseOrderByProidAsc(data);
        return ls;

    }
    @GetMapping("/detail/{stProid}")
    public  String detail(@PathVariable String stProid , Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<Users> ou = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase( currentPrincipalName );
        model.addAttribute("userImage",ou.get().getUserimage().getImagename());
        model.addAttribute("useremail",currentPrincipalName );





        Product pr = new Product();
        try {
            int proid = Integer.parseInt(stProid);
            pr = pRepo.findById(proid).get();
            model.addAttribute("product",pr);

        }catch (Exception e){

        }

        return "productDetail";
    }

    @ResponseBody
    @PostMapping("/update")
    public Product updateProduct(@RequestBody ProductLayer productLayer){
        System.out.println(productLayer);
        Product product = new Product();
        Category category = new Category();
        Suppliers suppliers = new Suppliers();
        Product p = new Product();
        try {

            product = pRepo.findById(productLayer.getProid()).get();
            if (product.getProductcategory().getCaid() != productLayer.getProductcategory()){
                category = cRepo.findById(productLayer.getProductcategory()).get();
                product.setProductcategory(category);
            }
            if (product.getProductsuppliers().getSid() != productLayer.getProductsuppliers()){

                suppliers = sRepo.findById(productLayer.getProductsuppliers()).get();
                product.setProductsuppliers(suppliers);
            }
            product.setProid(product.getProid());
            product.setProductname(productLayer.getProductname());
            product.setProductunit(productLayer.getProductunit());
            product.setProducttype(productLayer.getProducttype());
            product.setProductbarcode(productLayer.getProductbarcode());
            product.setProducttax(productLayer.getProducttax());
            product.setBuyprice(productLayer.getBuyprice());
            product.setSellprice(productLayer.getSellprice());
            product.setCriticalquantity(productLayer.getCriticalquantity());
            product.setProductstatus(productLayer.getProductstatus());
            product.setPspki(productLayer.getPspki());
            product.setPbpki(productLayer.getPbpki());
            p = pRepo.saveAndFlush(product);
        }catch (Exception e){
            System.err.println("Product Update Error : " + e);
        }
        return p;
    }
    @ResponseBody
    @PostMapping("/addStock")
    public ProductStock addStock(@RequestBody ProductStock productStock){
        ProductStock ps = new ProductStock();
        System.out.println(productStock);
        try {
           ps = psRepo.save(productStock);
        }catch (Exception e){
            System.err.println("AddStock Error");
        }
        return ps;
    }
    @ResponseBody
    @GetMapping("/pslist/{pid}")
    public List<ProductStock> search(@PathVariable Integer pid) {
        List<ProductStock> ls =psRepo.findByProdidEqualsAllIgnoreCase(pid);
        System.out.println(ls);
        return ls;
    }

}