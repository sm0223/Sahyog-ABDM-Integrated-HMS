package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Artifacts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtifactsRepository extends JpaRepository<Artifacts, Integer> {
}
