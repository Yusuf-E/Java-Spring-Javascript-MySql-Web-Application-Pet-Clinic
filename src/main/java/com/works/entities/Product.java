package com.works.entities;

import lombok.Data;

import javax.persistence.*;
@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proid", nullable = false)
    private Integer proid;

    @Column(unique = true)
    private String productname;

    private Integer productunit;

    private Integer producttype;

    @Column(unique = true)
    private String productbarcode;

    @Column(unique = true)
    private String productcode;

    private Integer producttax;

    private Integer buyprice;

    private Integer sellprice;

    private Integer criticalquantity;

    private String productstatus;

    private String pspki;

    private String pbpki;

    @OneToOne
    private Suppliers productsuppliers;

    @OneToOne
    private Category productcategory;

    public Integer getProid() {
        return proid;
    }

    public void setProid(Integer proid) {
        this.proid = proid;
    }

}
