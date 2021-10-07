package com.works.entities;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iid", nullable = false)
    private Integer iid;


    private String imagename;
}
