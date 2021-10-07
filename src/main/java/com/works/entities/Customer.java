package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cid", nullable = false)
    private Integer cid;


    private String cname;
    private String csurname;
    private String mobile_phone;
    private String  email;
    private int tax;
    private String  tax_administration;
    private int ctype;
    private String cnote;
    private String cprovince;
    private String cdistrict;
    private String caddress;
    private int cdiscount;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Pet> pets;














}
