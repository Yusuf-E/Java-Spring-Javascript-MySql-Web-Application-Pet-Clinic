package com.works.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class ProductStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer psid;

    private Integer prodid;


    private Integer waid;

    private  Integer stock;

    private Boolean opstatus;


    @JsonFormat(pattern="dd.MM.yyyy HH:mm")
    @Column(name = "date")
    private Date date = new Date();




}
