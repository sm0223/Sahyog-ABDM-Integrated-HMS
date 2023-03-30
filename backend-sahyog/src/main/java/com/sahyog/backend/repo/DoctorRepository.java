package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
Doctor deleteByHealthIdNumber(String healthIdNumber);

    Doctor findByHealthIdNumber(String healthIdNumber);
}
