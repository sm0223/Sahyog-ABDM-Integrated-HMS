package com.sahyog.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CareContext {

    @Id
    @SequenceGenerator(
            name = "care_context_sequence",
            sequenceName = "care_context_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "care_context_sequence"
    )
    private int careContextId;
    public String display;

    @ManyToOne
    @JoinColumn(
            name = "patient_id_fk",
            referencedColumnName = "patientId"
    )
    public Patient patient;
    @ManyToOne
    @JoinColumn(
            name = "doctor_id_fk",
            referencedColumnName = "doctorId"
    )
    public Doctor doctor;
    @OneToMany(mappedBy = "careContext")
    List<Visit> visitList;

}
