package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.print.Doc;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor findByHealthIdNumber(String healthId);

    @Query(value = "select * from doctor d where d.user_id_fk=?1", nativeQuery = true)
    Doctor findDoctorsByUserId(int userId);
}
