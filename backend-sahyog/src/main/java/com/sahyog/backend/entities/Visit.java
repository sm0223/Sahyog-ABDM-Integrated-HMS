package com.sahyog.backend.entities;

import jakarta.persistence.*;

@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "id")
    public Patient patient;
    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "id")
    public Doctor doctor;
    public String reasonOfVisit;
    public String diagnosis;
    public String prescription;

    public String dateOfVisit;

    public Visit() {
    }

    public Visit(int id, Patient patient, Doctor doctor, String reasonOfVisit, String diagnosis, String prescription, String dateOfVisit) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.reasonOfVisit = reasonOfVisit;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
        this.dateOfVisit = dateOfVisit;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getReasonOfVisit() {
        return reasonOfVisit;
    }

    public void setReasonOfVisit(String reasonOfVisit) {
        this.reasonOfVisit = reasonOfVisit;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }

    public String getDateOfVisit() {
        return dateOfVisit;
    }

    public void setDateOfVisit(String dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    @Override
    public String toString() {
        return "Visit{" +
                "id=" + id +
                ", patient=" + patient +
                ", doctor=" + doctor +
                ", reasonOfVisit='" + reasonOfVisit + '\'' +
                ", diagnosis='" + diagnosis + '\'' +
                ", prescription='" + prescription + '\'' +
                ", dateOfVisit='" + dateOfVisit + '\'' +
                '}';
    }
}
