package com.works.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", nullable = false)
    private Integer uid;

    private String username;
    private String usersurname;


    private String useremail;

    private String password;

    private boolean enabled;
    private boolean tokenExpired;

    private String userphone;
    private String userstatus;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Image userimage;


    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "uid"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "rid"))
    private List<Role> roles;


}
