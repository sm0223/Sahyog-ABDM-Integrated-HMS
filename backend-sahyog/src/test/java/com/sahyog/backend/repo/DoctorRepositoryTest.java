package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Doctor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DoctorRepositoryTest {


    @Autowired
    DoctorRepository doctorRepository;

    @Test
    public void saveDoctor()
    {
        Doctor doctor = Doctor.builder()
                .healthId("hardeep@sbx")
                .registrationNumber("12345")
                .name("Shubham")
                .build();
        doctorRepository.save(doctor);
    }

}