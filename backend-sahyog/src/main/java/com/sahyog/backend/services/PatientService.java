package com.sahyog.backend.services;

import com.sahyog.backend.entities.Patient;
import com.sahyog.backend.repo.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Patient savePatient(Patient patient)
    {
        return patientRepository.save(patient);
    }
    public List<Patient> findDetails() {
        return patientRepository.findAll();
    }

//    public int savePatient()
//    {
//        try{
//            return patientRepository.save(patient);
//            return 1;
//        }catch (Exception e){
//            e.getStackTrace();
//            System.out.println(e.getMessage());
//            return 0;
//        }
//    }

}
