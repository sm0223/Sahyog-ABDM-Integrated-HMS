package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Doctor;
import com.sahyog.backend.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.print.Doc;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor findByHealthIdNumber(String healthId);

    @Query(value = "select * from doctor d where d.user_id_fk=?1", nativeQuery = true)
    Doctor findDoctorsByUserId(int userId);

    Doctor findDoctorsByUser(User user);

    Doctor findDoctorsByRegistrationNumber(String registrationNumber);

    @Modifying
    @Transactional
    @Query(
            value = "update consent set status = ?1 where consent_id = ?2",
            nativeQuery = true
    )
    public void updateDoctor(String status, String consentId);
}
