package com.works.controllers;

import com.works.entities.Bill;
import com.works.entities.ProductStock;
import com.works.properties.SaleLayer;
import com.works.repositories.BillRepository;
import com.works.repositories.ProductStockRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/sale")
public class SaleController {

    final ProductStockRepository psRepo;
    final BillRepository billRepo;

    public SaleController(ProductStockRepository psRepo, BillRepository billRepo) {
        this.psRepo = psRepo;
        this.billRepo = billRepo;
    }


    @ResponseBody
    @PostMapping("/sell/{paytype}")
    public Boolean saleProduct(@RequestBody SaleLayer sl, @PathVariable Integer paytype){
        int stock = 0;
        System.out.println("Product Stok :"+sl);
        ProductStock ps = new ProductStock();
        Bill bill = new Bill();
        List<ProductStock> ls = new ArrayList<>() ;
        try{
            ProductStock ps2 = new ProductStock();
            ls = psRepo.findByProdidEqualsAndWaidEqualsAllIgnoreCaseOrderByPsidDesc(sl.getProdid(),sl.getWaid());
            if (!ls.isEmpty()){
                ps2 = ls.get(0);
                stock = ps2.getStock();
            }
            ps.setOpstatus(sl.getOpestatus());
            ps.setProdid(sl.getProdid());
            ps.setWaid(sl.getWaid());
            ps.setOpstatus(sl.getOpestatus());
            ps.setStock((stock - 1));
            psRepo.save(ps);
            bill.setBill_id(sl.getBill_id());
            bill.setAmount(sl.getAmount());
            bill.setCus_id(sl.getCus_id());
            bill.setOpestatus(sl.getOpestatus());
            bill.setPaymenttype(paytype);
            if (!sl.getNote().equals("")){
                bill.setNote(sl.getNote());
            }
            else{
                bill.setNote(sl.getAmount() + "TL Satış Yapıldı.");
            }
            billRepo.save(bill);
            return true;
        }catch (Exception exception){
            System.err.println("SaveBox Error : "+exception);
            return false ;
        }
    }
    @ResponseBody
    @GetMapping("/list")
    public List<Bill> saleList(){
        boolean status;
        List<Bill> ls = new ArrayList<>();
        try{
            ls =  billRepo.findByOpestatusEqualsAllIgnoreCaseOrderByDateDesc(false);
        }catch (Exception ex){
            System.err.println("BuyList Error : " +ex);
        }
        return ls;
    }
}
