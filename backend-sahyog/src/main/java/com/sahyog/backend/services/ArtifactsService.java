package com.sahyog.backend.services;

import com.sahyog.backend.entities.Artifacts;
import com.sahyog.backend.repo.ArtifactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class ArtifactsService {

    @Autowired
    public ArtifactsRepository artifactsRepository;

    public void saveArtifacts(Artifacts artifacts)
    {
        artifactsRepository.save(artifacts);
        return;
    }
}
