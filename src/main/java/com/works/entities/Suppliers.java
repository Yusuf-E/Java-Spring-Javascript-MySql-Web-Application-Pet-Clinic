package com.works.entities;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
public class Suppliers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sid", nullable = false)
    private Integer sid;


    private String sname;
    private String semail;
    private String sphone;
    private String sstatus;

}
