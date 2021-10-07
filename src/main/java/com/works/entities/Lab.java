package com.works.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lid", nullable = false)
    private Integer lid;

    private int type;

    private String result;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Image labimage;

    @OneToOne
    private Pet pet;

    @JsonFormat(pattern="dd.MM.yyyy HH:mm")
    private Date date = new Date();


}
