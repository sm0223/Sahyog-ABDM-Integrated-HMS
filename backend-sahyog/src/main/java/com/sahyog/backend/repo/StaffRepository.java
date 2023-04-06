package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Staff findByHealthIdNumber(String healthId);
}
