package com.sahyog.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class CareContext {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(cascade = {CascadeType.ALL})
    public List<Visit> visitList;

    public String display;

    @ManyToOne(cascade = {CascadeType.ALL})
    public Patient patient;

    public CareContext(int id, List<Visit> visitList, String display, Patient patient) {
        this.id = id;
        this.visitList = visitList;
        this.display = display;
        this.patient = patient;
    }

    public CareContext() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Visit> getVisitList() {
        return visitList;
    }

    public void setVisitList(List<Visit> visitList) {
        this.visitList = visitList;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "CareContext{" +
                "id=" + id +
                ", visitList=" + visitList +
                ", display='" + display + '\'' +
                ", patient=" + patient +
                '}';
    }
}
