package com.sahyog.backend.services;

import com.sahyog.backend.entities.CareContext;
import com.sahyog.backend.entities.Patient;
import com.sahyog.backend.repo.CareContextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

//    @Autowired
//    private DoctorRepository doctorRepository;
//
//    @Autowired
//    private VisitRepository visitRepository;

    @Autowired
    private CareContextRepository careContextRepository;
//    public Visit addVisit(Visit visit)
//    {
//        return visitRepository.save(visit);
//    }
//    public List<Visit> findVisitByPatientId(Patient patient)
//    {
//        return visitRepository.findByHealthIdNumber(patient);
//    }

//    public Visit findVisitById(int id)
//    {
//        return visitRepository.findById(id);
//    }


    public CareContext addCareContext(CareContext careContext)
    {
        return careContextRepository.save(careContext);
    }

    public List<CareContext> getAllCareContextByPatientId(Patient patient)
    {
        return careContextRepository.findByPatient(patient);
    }


}
