package com.sahyog.backend.services;

import com.sahyog.backend.entities.Consent;
import com.sahyog.backend.repo.ConsentRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsentService {

    @Autowired
    private ConsentRepository consentRepository;

    public boolean saveConsent(Consent consent)
    {
        consentRepository.save(consent);
        return true;
    }
}
