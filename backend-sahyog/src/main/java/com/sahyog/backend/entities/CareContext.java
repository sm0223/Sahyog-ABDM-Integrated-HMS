package com.sahyog.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "care_context")
public class CareContext {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    public String display;
    public String patientId;

    public CareContext() {
    }

    public CareContext(int id, String display, String patientId) {
        this.id = id;
        this.display = display;
        this.patientId = patientId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }
    //    @OneToMany    public String patientId;
//    public List<Visit> visitList;



//    @ManyToOne
//    @JoinColumn(name = "patient_id_fk")
//    public Patient patient;

}
