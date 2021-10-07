package com.works.properties;

import lombok.Data;

import javax.persistence.Column;

@Data
public class ProductLayer {

    private Integer proid;

    private String productname;

    private Integer productunit;

    private Integer producttype;


    private String productbarcode;


    private String productcode;

    private Integer producttax;

    private Integer buyprice;

    private Integer sellprice;

    private Integer criticalquantity;

    private String productstatus;

    private String pspki;

    private String pbpki;

    private Integer productsuppliers;

    private Integer productcategory;

}
