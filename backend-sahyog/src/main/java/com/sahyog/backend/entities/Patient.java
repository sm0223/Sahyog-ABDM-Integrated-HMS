package com.sahyog.backend.entities;

import jakarta.persistence.*;

import java.util.ArrayList;


@Entity
public class Patient{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    public String healthId;
    public String healthIdNumber;
    public String name;
    public String gender;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "id")
    public Address address;
    public int yearOfBirth;
    public int dayOfBirth;
    public int monthOfBirth;
    public String healthNumber;
    public String mobile;
    public Patient() {
    }

    public Patient(int id, String healthId, String healthIdNumber, String name, String gender, Address address, int yearOfBirth, int dayOfBirth, int monthOfBirth, String healthNumber, String mobile) {
        this.id = id;
        this.healthId = healthId;
        this.healthIdNumber = healthIdNumber;
        this.name = name;
        this.gender = gender;
        this.address = address;
        this.yearOfBirth = yearOfBirth;
        this.dayOfBirth = dayOfBirth;
        this.monthOfBirth = monthOfBirth;
        this.healthNumber = healthNumber;
        this.mobile = mobile;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHealthId() {
        return healthId;
    }

    public void setHealthId(String healthId) {
        this.healthId = healthId;
    }

    public String getHealthIdNumber() {
        return healthIdNumber;
    }

    public void setHealthIdNumber(String healthIdNumber) {
        this.healthIdNumber = healthIdNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public int getYearOfBirth() {
        return yearOfBirth;
    }

    public void setYearOfBirth(int yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public int getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(int dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public int getMonthOfBirth() {
        return monthOfBirth;
    }

    public void setMonthOfBirth(int monthOfBirth) {
        this.monthOfBirth = monthOfBirth;
    }

    public String getHealthNumber() {
        return healthNumber;
    }

    public void setHealthNumber(String healthNumber) {
        this.healthNumber = healthNumber;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", healthId='" + healthId + '\'' +
                ", healthIdNumber='" + healthIdNumber + '\'' +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", address=" + address +
                ", yearOfBirth=" + yearOfBirth +
                ", dayOfBirth=" + dayOfBirth +
                ", monthOfBirth=" + monthOfBirth +
                ", healthNumber='" + healthNumber + '\'' +
                ", mobile='" + mobile + '\'' +
                '}';
    }
}


