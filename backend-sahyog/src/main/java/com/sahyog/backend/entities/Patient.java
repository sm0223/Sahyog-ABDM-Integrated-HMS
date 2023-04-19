package com.sahyog.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(
        uniqueConstraints = @UniqueConstraint(
                name = "healthId_unique",
                columnNames = "healthId"
        )
)
public class Patient{

    @Id
    @SequenceGenerator(
            name = "patient_sequence",
            sequenceName = "patient_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "patient_sequence"
    )
    private int patientId;
    public String healthId;
    public String name;
    public String gender;
    public int yearOfBirth;
    public int dayOfBirth;
    public int monthOfBirth;
    public String healthNumber;
    public String mobile;
    @Embedded
    public Address address;
    @OneToMany(mappedBy = "patient")
    List<CareContext> careContextList;
    @OneToMany(mappedBy = "patient")
    List<Visit> visitList;


}


