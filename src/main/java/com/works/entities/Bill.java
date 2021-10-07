package com.works.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Bill {
    @Id
    private String bill_id;

    private Integer cus_id;

    private Integer amount;

    private Boolean opestatus;

    private Integer paymenttype;

    private Date date = new Date();

    private String note ;
}
