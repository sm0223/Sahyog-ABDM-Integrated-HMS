package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Address;
import com.sahyog.backend.entities.Doctor;
import com.sahyog.backend.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.print.Doc;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor findByHealthIdNumber(String healthId);

    @Query(value = "select * from doctor d where d.user_id_fk=?1", nativeQuery = true)
    Doctor findDoctorsByUserId(int userId);

    Doctor findDoctorsByUser(User user);

    Doctor findDoctorsByRegistrationNumber(String registrationNumber);

//    @Modifying
//    @Transactional
//    @Query(
//            value = "update consent set status = ?1 where consent_id = ?2",
//            nativeQuery = true
//    )
//    public void updateDoctor(String status, String consentId);

    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.address = :address, d.gender = :gender, d.name = :name, d.mobile = :mobile, d.dayOfBirth = :dayOfBirth, d.monthOfBirth = :monthOfBirth, d.yearOfBirth = :yearOfBirth, d.registrationNumber = :registrationNumber, d.healthId = :healthId, d.user = :user WHERE d.healthIdNumber = :healthIdNumber")
    void updateDoctor(@Param("healthIdNumber") String healthIdNumber, @Param("address") Address address, @Param("gender") String gender, @Param("name") String name, @Param("mobile") String mobile, @Param("dayOfBirth") int dayOfBirth, @Param("monthOfBirth") int monthOfBirth, @Param("yearOfBirth") int yearOfBirth, @Param("registrationNumber") String registrationNumber, @Param("healthId") String healthId, @Param("user") User user);
}
