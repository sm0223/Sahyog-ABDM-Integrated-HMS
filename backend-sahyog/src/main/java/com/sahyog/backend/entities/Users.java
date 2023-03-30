package com.sahyog.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Users {

    @Id
    @GeneratedValue
    public int id;
    public String username;
    //---------Encryption pending--------------
    public String password;

    public String userType;


}
