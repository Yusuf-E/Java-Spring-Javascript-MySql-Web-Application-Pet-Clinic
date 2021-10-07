package com.works.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "caid", nullable = false)
    private Integer caid;

    private String categoryname;


}
