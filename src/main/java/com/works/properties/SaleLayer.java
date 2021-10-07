package com.works.properties;

import lombok.Data;

import java.util.Date;

@Data
public class SaleLayer {

    private String bill_id;

    private Integer cus_id;

    private Integer amount;

    private Boolean opestatus;

    private String note ;

    private Integer waid;

    private Integer prodid;

}
