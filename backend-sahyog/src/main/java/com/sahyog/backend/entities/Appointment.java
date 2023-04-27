//package com.sahyog.backend.entities;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//import lombok.*;
//
//import javax.print.Doc;
//import java.util.Date;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
//@Builder
//public class Appointment {
//    @Id
//    @SequenceGenerator(
//            name = "care_context_sequence",
//            sequenceName = "care_context_sequence",
//            allocationSize = 1
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "care_context_sequence"
//    )
//    private int appointmentId;
//
//    public String date;
//
//    @ManyToOne
//    @JoinColumn(
//            name = "patient_id_fk",
//            referencedColumnName = "patientId"
//    )
//    public Patient patient;
//
//    @ManyToOne
//    @JoinColumn(
//            name = "patient_id_fk",
//            referencedColumnName = "doctorId"
//    )
//    public Doctor doctor;
//
//}
