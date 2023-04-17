package com.sahyog.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sahyog.backend.entities.*;
import com.sahyog.backend.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;


@RestController

public class MyController {
    String accessToken;
    private static CustomResponse asyncCustomResponse = new CustomResponse();
    private HashMap<String, SseEmitter> emitters = new HashMap<>();
    private Util util = new Util();
    @GetMapping("/home")
    public String home()  {
        System.out.println("home");
        return "";
    }
    //Receiving Callback APIs from ABDM and dispatching SSEs
    @PostMapping("/v0.5/users/auth/on-init")
    public void onInit(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: ON-INIT " + response);
        String keyPath = "auth\":{\"transactionId\"";
        String transactionId = util.getValueFromString(keyPath, response);
        asyncCustomResponse.setTransactionId(transactionId);
        String requestId = util.getRequestId(response);

        SseEmitter sseEmitter = emitters.get(requestId);
        sseEmitter.send(SseEmitter.event().name("ABDM-EVENT").data(asyncCustomResponse));
    }
    @PostMapping("/v0.5/users/auth/on-confirm")
    public void onConfirm(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: ON-CONFIRM " + response);
        accessToken = util.getAccessToken(response);
        String requestId = util.getRequestId(response);

        String keyPath1 = "patient\":";
        String keyPath2 = "\"error\"";
        String patient = util.getValueFromString2(keyPath1,keyPath2, response);
        asyncCustomResponse.setPatient(patient);

        SseEmitter sseEmitter = emitters.get(requestId);
        sseEmitter.send(SseEmitter.event().name("ABDM-EVENT").data(asyncCustomResponse));
    }

    //Custom APIS for FRONTEND and Initiating SSEs
    @PostMapping(value = "/api/register/health-id") // auth/init
    public SseEmitter registerPatientUsinghealthId(@RequestBody CustomRequest customRequest) throws Exception, IOException {
        System.out.println("REQUEST: REGISTER-PATIENT-USING-HEALTH-ID");
        ABDMSession session = new ABDMSession();
        session.setToken();
        String UUIDCode = UUID.randomUUID().toString();
        int statusCode = session.patientInitUsingMobile(UUIDCode, customRequest.getHealthId()); //Calling abha to init patient using mobile otp

        SseEmitter sseEmitter = new SseEmitter((long)5000);
        emitters.put(UUIDCode, sseEmitter);
        sseEmitter.onCompletion(()->emitters.remove(sseEmitter));
        sseEmitter.onTimeout(()->emitters.remove(sseEmitter));
        sseEmitter.onError((e)->emitters.remove(sseEmitter));

        System.out.println("STATUS: REGISTER-PATIENT-USING-HEALTH-ID: " + statusCode);

        return sseEmitter;
    }

    @PostMapping(value = "/api/register/confirmMobileOTP")
    public SseEmitter confirmMobileOTP(@RequestBody CustomRequest customRequest) throws Exception {
        System.out.println();

        ABDMSession session = new ABDMSession();
        session.setToken();
        String UUIDCode = UUID.randomUUID().toString();

        int statusCode = session.confirmMobileOTP(UUIDCode, customRequest.getTransactionId(), customRequest.getMobileOTP());

        SseEmitter sseEmitter = new SseEmitter((long)5000);
        emitters.put(UUIDCode, sseEmitter);
        sseEmitter.onCompletion(()->emitters.remove(sseEmitter));
        sseEmitter.onTimeout(()->emitters.remove(sseEmitter));
        sseEmitter.onError((e)->emitters.remove(sseEmitter));

        System.out.println("STATUS: REGISTER-PATIENT-USING-HEALTH-ID: " + statusCode);
        return sseEmitter;


    }

    @GetMapping(value = "/api/link/care-context")
    public SseEmitter linkingCareContext() throws Exception {
        System.out.println("REQUEST: LINKING_CARE_CONTEXT");
        ABDMSession session = new ABDMSession();
        session.setToken();

        int statusCode = session.careContextLinking(accessToken);
        String UUIDCode = UUID.randomUUID().toString();
        SseEmitter sseEmitter = new SseEmitter((long)1000);

        sseEmitter.onCompletion(()->emitters.remove(sseEmitter));
        emitters.put(UUIDCode, sseEmitter);
        sseEmitter.onCompletion(()->emitters.remove(sseEmitter));
        sseEmitter.onTimeout(()->emitters.remove(sseEmitter));
        sseEmitter.onError((e)->emitters.remove(sseEmitter));

        System.out.println("STATUS: LINKING_CARE_CONTEXT: " + statusCode);

        return sseEmitter;
    }



//    ---------Patient Services------------
        @Autowired
        private PatientService patientService;

    @PostMapping("/api/patient/save")
    public boolean SavePatient(@RequestBody Patient patient)
    {
        System.out.println("Patient : "+patient.toString());
        return patientService.savePatient(patient);
    }

    @PostMapping("/api/patient/details")
    public List<Patient> getAllPatients()
    {
        return patientService.findDetails();
    }
    @PostMapping("/api/patient/{healthId}")
    public Patient getPatient(@PathVariable String healthId)
    {
        System.out.println("Getting Patient from HealthId "+ healthId);
        return patientService.findPatientByHealthId(healthId);
    }

//    ---------Doctor Services-------------------

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/api/doctor/care-context/create")
    public CareContext createNewCareContext(@RequestBody CareContext careContext)
    {
        careContext.patient = patientService.findPatientByHealthId(careContext.patient.healthId);

        return doctorService.addCareContext(careContext);
    }



//    ---------Admin Doctor services-------------
    @Autowired
    private AdminService adminDoctorService;

    @PostMapping("/api/admin/addDoctor")
    public Doctor saveDoctor(@RequestBody Doctor doctor)
    {
        return adminDoctorService.addDoctor(doctor);
    }
//    @CrossOrigin(origins = "http://172.16.134.145:3000")
    @PostMapping(value="/api/admin/getAllDoctors")
    public List<Doctor> getAllDoctors()
    {
        System.out.println("asdf");
        return adminDoctorService.findDoctors();
    }


    @PostMapping("/api/admin/getDoctor/{healthIdNumber}")
    public Doctor getDoctor(@PathVariable String healthIdNumber)
    {
        return adminDoctorService.findDoctorByHealthId(healthIdNumber);
    }

//    @GetMapping("/api/admin/getDoctor/{id}")
//    public Doctor getDoctor(@PathVariable int id)
//    {
//        return adminDoctorService.findDoctorById(id);
//    }

    @DeleteMapping("/api/admin/deleteDoctor/{id}")
    public String deleteDoctor(@PathVariable int id)
    {
        return adminDoctorService.deleteDoctor(id);
    }

    @PutMapping("/api/admin/updateDoctor")
    public Doctor updateDoctor(@RequestBody Doctor doctor)
    {
        return adminDoctorService.updateDoctor(doctor);
    }


    //---------Admin Staff services------------------
    @Autowired
    private AdminService adminStaffService;
    @PostMapping("/api/admin/addStaff")
    public Staff saveStaff(@RequestBody Staff staff){ return adminStaffService.addStaff(staff);}

    @GetMapping("/api/admin/getAllStaffs")
    public List<Staff> getAllStaffs()
    {
        return adminStaffService.findStaffs();
    }

    @DeleteMapping("/api/admin/deleteStaff/{healthIdNumber}")
    public String deleteStaff(@PathVariable String healthIdNumber)
    {
        return adminStaffService.deleteStaff(healthIdNumber);
    }

    @PutMapping("/api/admin/update")
    public Staff updateStaff(@RequestBody Staff staff)
    {
        return adminStaffService.updateStaff(staff);
    }

}

