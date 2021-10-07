package com.works.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class PetRace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rid", nullable = false)
    private Integer rid;

     private String prace;


}
