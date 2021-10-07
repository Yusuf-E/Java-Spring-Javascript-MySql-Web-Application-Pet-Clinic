package com.works.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid", nullable = false)
    private Integer pid;

    private String cpatient;
    private int cchip;
    private int creport;
    private String cbirth;
    private int ckind;
    private String cgender;
    private String cbarren;

    @OneToOne
    private PetColor pColor;

    @OneToOne
    private PetRace pRace;











}
