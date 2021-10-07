package com.works.properties;

import lombok.Data;

@Data
public class CustomerLayer {
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
}
