package com.works.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "did", nullable = false)
    private Integer did;

    private String title;
    private String detail;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date ;

    private String dtime;




}
