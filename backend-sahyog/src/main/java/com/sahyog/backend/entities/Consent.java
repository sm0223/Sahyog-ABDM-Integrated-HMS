package com.sahyog.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Consent {
    @Id
    @SequenceGenerator(
            name = "consent_sequence",
            sequenceName = "consent_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "consent_sequence"
    )
    private int consentIdPK;
    public String purposeText;
    public String consentId;
    public String fromDate;
    public String toDate;
    public String eraseDate;
    public String status;

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
}
