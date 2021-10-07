package com.works.entities;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class WareHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wid;

    @Column(unique = true)
    private String wname;
}
