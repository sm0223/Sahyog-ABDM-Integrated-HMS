package com.sahyog.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Artifacts {
    @Id
    @SequenceGenerator(
            name = "artifacts_sequence",
            sequenceName = "artifacts_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "artifacts_sequence"
    )
    public int artifactId;

    public String consentArtifactId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(
            name = "patient_id_fk",
            referencedColumnName = "patientId"
    )
    public Patient patient;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(
            name = "consent_id_fk",
            referencedColumnName = "consentIdPK"
    )
    public Consent consent;

}
