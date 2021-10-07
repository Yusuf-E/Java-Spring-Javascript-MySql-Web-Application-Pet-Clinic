package com.works.controllers;

import com.works.entities.Bill;
import com.works.entities.BoxAction;

import com.works.entities.ProductStock;
import com.works.repositories.BillRepository;
import com.works.repositories.BoxRepository;
import com.works.repositories.ProductStockRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/buy")
public class BuyController {

    final BoxRepository bRepo;
    final ProductStockRepository psRepo;
    final BillRepository billRepo;

    public BuyController(BoxRepository bRepo, ProductStockRepository psRepo, BillRepository billRepo) {
        this.bRepo = bRepo;
        this.psRepo = psRepo;
        this.billRepo = billRepo;
    }

    @ResponseBody
    @GetMapping("/boxes/{stPid}")
    public List<BoxAction> boxAction( @PathVariable String stPid){
        List<BoxAction> ls = new ArrayList<>();
        try{
            int id = Integer.parseInt(stPid);
            ls = bRepo.findBySuidEqualsAllIgnoreCase(id);
        }catch (Exception ex ){
            System.err.println("BoxAction List Error : " + ex);
        }
        return ls ;
    }
    @ResponseBody
    @PostMapping("/boxes/add")
    public BoxAction boxAdd( @RequestBody BoxAction boxAction ){
        System.out.println(boxAction);

        BoxAction ba = new BoxAction();
        try{

            ba = bRepo.saveAndFlush(boxAction);
        }catch (Exception ex ){
            System.err.println("BoxAction List Error : " + ex);
        }
        return ba ;
    }

    @ResponseBody
    @PostMapping("/savebox/{paytype}")
    public Boolean saveBox( @RequestBody List<BoxAction> boxAction ,@PathVariable Integer paytype){

        System.out.println(boxAction);
        String bill_id="";
        Integer cus_id=0;
        Integer amount = 0;
        Integer paymenttype = paytype;

        List<ProductStock> ls = new ArrayList<>() ;


        Bill bill = new Bill();

        int stock = 0;
        try{
            for (BoxAction ba : boxAction){
                System.out.println(ba);
                ProductStock ps = new ProductStock();
                ProductStock ps2 = new ProductStock();
                ls = psRepo.findByProdidEqualsAndWaidEqualsAllIgnoreCaseOrderByPsidDesc(ba.getProdid(),ba.getWarid());
                if (!ls.isEmpty()){
                    ps2 = ls.get(0);
                    stock = ps2.getStock();
                }
                bill_id = ba.getBid();
                cus_id = ba.getSuid();
                amount = amount+(ba.getQuantity()*ba.getPrice());
                ps.setProdid(ba.getProdid());
                ps.setStock(ba.getQuantity()+stock);
                ps.setWaid(ba.getWarid());
                ps.setOpstatus(true);
                psRepo.save(ps);
                bRepo.deleteById(ba.getBoid());
            }
            bill.setBill_id(bill_id);
            bill.setAmount(amount);
            bill.setCus_id(cus_id);
            bill.setOpestatus(true); // alış true
            bill.setPaymenttype(paymenttype);
            bill.setNote(amount + "TL Alış Yapıldı.");
            billRepo.save(bill);
            return true;
        }catch (Exception ex ){
            System.err.println("SaveBox Error : "+ex);
            return false ;
        }


    }

    @ResponseBody
    @GetMapping("/deletebox/{boxid}")
    public Boolean deleteBox( @PathVariable Integer boxid){
        boolean status;
        try{
            bRepo.deleteById(boxid);
            status = true;
        }catch (Exception ex){
            System.err.println("deleteBox Error : " +ex);
            status = false;
        }
        return status;
    }

    @ResponseBody
    @GetMapping("/list")
    public List<Bill> saleList(){
        boolean status;
        List<Bill> ls = new ArrayList<>();
        try{
            ls =  billRepo.findByOpestatusEqualsAllIgnoreCaseOrderByDateDesc(true);
        }catch (Exception ex){
            System.err.println("BuyList Error : " +ex);
        }
        return ls;
    }
}