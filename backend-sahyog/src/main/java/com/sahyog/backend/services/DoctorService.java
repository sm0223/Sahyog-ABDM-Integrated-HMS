package com.sahyog.backend.services;

import com.sahyog.backend.entities.CareContext;
import com.sahyog.backend.entities.Doctor;
import com.sahyog.backend.entities.Patient;
import com.sahyog.backend.entities.Visit;
import com.sahyog.backend.repo.CareContextRepository;
import com.sahyog.backend.repo.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {


    @Autowired
    private CareContextRepository careContextRepository;

    public List<CareContext> getAllCareContextsByPatient(Patient patient) {
        return careContextRepository.findCareContextsByPatient(patient);
    }

    public CareContext addCareContext(CareContext careContext)
    {
        for (Visit visit : careContext.getVisitList()) {
            System.out.println(visit.healthRecord.toString());
        }
        return careContextRepository.save(careContext);
    }

//    @Autowired
//    private DoctorRepository doctorRepository;
//
////    public Doctor findDoctorByUserId(int userId)
////    {
////        return doctorRepository.findDoctorByUser(userId);
////
////    }
}
