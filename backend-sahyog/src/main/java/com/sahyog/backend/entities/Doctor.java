package com.sahyog.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                name = "healthid_unique",
                columnNames = "healthId"
        ),
                @UniqueConstraint(
                        name = "registrationNumber_unique",
                        columnNames = "registrationNumber"
                )

        }
)
public class Doctor {
    @Id
    @SequenceGenerator(
            name = "doctor_sequence",
            sequenceName = "doctor_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "doctor_sequence"
    )
    private int doctorId;
    @Column(unique = true)
    public String healthId;
    public String healthIdNumber;
    public String registrationNumber;
    public String name;
    public String gender;
    public int yearOfBirth;
    public int dayOfBirth;
    public int monthOfBirth;
    public String mobile;
    @Embedded
    public Address address;

    @OneToMany(mappedBy = "doctor")
    public List<Visit> visitList;
    @OneToMany(mappedBy = "doctor")
    List<Consent> consentList;

  @OneToOne(
          cascade = CascadeType.ALL,
          optional = false
  )
  @JoinColumn(
          name="user_id_fk",
          referencedColumnName="userID"
  )
  @JsonManagedReference(value = "doctorBackRef")
    public User user;
}
