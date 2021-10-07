package com.works.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class PetColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pcid", nullable = false)
    private Integer pcid;


    private String pcolor;


}
