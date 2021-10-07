package com.works.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class BoxAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boid; // box id

    private String bid; // bill id

    private Integer suid; // supplier id

    private Integer prodid; // product id

    private Integer quantity;

    private Integer price;

    private Integer warid;

}
