package com.sahyog.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;



    public String reasonOfVisit;
    public String diagnosis;
    public String prescription;
    public String dateOfVisit;

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
    @ManyToOne
    @JoinColumn(
            name = "care_context_id_fk",
            referencedColumnName = "careContextId"
    )
    public CareContext careContext;


}
