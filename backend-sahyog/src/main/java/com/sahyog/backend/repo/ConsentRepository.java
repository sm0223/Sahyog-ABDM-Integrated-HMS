package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Consent;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsentRepository extends JpaRepository<Consent, Integer> {

    @Modifying
    @Transactional
    @Query(
            value = "update consent set consent_id = ?1 where request_id = ?2",
            nativeQuery = true
    )
    void updateConsentId(String consentId, String requestId);
}
