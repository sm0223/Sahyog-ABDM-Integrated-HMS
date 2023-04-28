package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Address;
import com.sahyog.backend.entities.Staff;
import com.sahyog.backend.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StaffRepository extends JpaRepository<Staff,Integer> {

//    Staff deleteByHealthIdNumber(String healthIdNumber);

    Staff findByHealthIdNumber(String healthIdNumber);

    @Transactional
    @Modifying
    @Query("UPDATE Staff s SET s.address = :address, s.gender = :gender, s.name = :name, s.mobile = :mobile, s.dayOfBirth = :dayOfBirth, s.monthOfBirth = :monthOfBirth, s.yearOfBirth = :yearOfBirth, s.healthId = :healthId, s.user = :user WHERE s.healthIdNumber = :healthIdNumber")
    void updateStaff(@Param("healthIdNumber") String healthIdNumber, @Param("address") Address address, @Param("gender") String gender, @Param("name") String name, @Param("mobile") String mobile, @Param("dayOfBirth") int dayOfBirth, @Param("monthOfBirth") int monthOfBirth, @Param("yearOfBirth") int yearOfBirth, @Param("healthId") String healthId, @Param("user") User user);
}
