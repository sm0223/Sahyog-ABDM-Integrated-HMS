package com.sahyog.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArtifactsHIP {

    @Id
    @SequenceGenerator(
            name = "artifactsHIP_sequence",
            sequenceName = "artifactsHIP_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "artifactsHIP_sequence"
    )
    public int artifactsHIPId;

    public String artifactsId;
    @ElementCollection
    public List<String> careContextIds;
    public String patientHealthId;
}
