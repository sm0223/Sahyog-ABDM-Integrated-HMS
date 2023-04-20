package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Consent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsentRepository extends JpaRepository<Consent, Integer> {

}
