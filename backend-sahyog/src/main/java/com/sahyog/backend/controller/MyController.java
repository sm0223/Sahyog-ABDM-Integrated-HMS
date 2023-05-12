package com.sahyog.backend.controller;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.google.gson.Gson;
import com.sahyog.backend.entities.*;
import com.sahyog.backend.repo.*;
import com.sahyog.backend.services.*;
import com.sahyog.backend.utilities.FhirUtility;
import com.sahyog.backend.utilities.Util;
import org.hl7.fhir.r4.model.Bundle;
import org.json.JSONArray;
import org.json.JSONObject;
import com.sahyog.backend.repo.CareContextRepository;
import com.sahyog.backend.repo.DoctorRepository;
import com.sahyog.backend.repo.PatientRepository;
import com.sahyog.backend.repo.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;


@RestController

public class MyController {
    String accessToken;
    private static CustomResponse asyncCustomResponse = new CustomResponse();
    private HashMap<String, SseEmitter> emitters = new HashMap<>();
    private Util util = new Util();
    private PasswordEncoder passwordEncoder;

    String HIP_PRIVATE_KEY = "VfAJSicIeu5XqO1EyAwct3RUZc4yYaKyHxTogEbDwg==";
    String HIP_PUBLIC_KEY = "BCFNaWHwbyu/e+f+c/uljadKYTGMPulDEoGsR473pp1kGROQz7NnSFRthJwGdy8TwYQhZrdW6zDhLFJ+G9OFYNc=";
    String HIP_NONCE = "6mCcU6b2ixlYiRb7dUFZVuNUp37TvJ9DILSSTvfIFMo=";
    String HIU_PRIVATE_KEY = "VfAJSicIeu5XqO1EyAwct3RUZc4yYaKyHxTogEbDwg==";
    String HIU_PUBLIC_KEY = "BCFNaWHwbyu/e+f+c/uljadKYTGMPulDEoGsR473pp1kGROQz7NnSFRthJwGdy8TwYQhZrdW6zDhLFJ+G9OFYNc=";
    String HIU_NONCE = "6mCcU6b2ixlYiRb7dUFZVuNUp37TvJ9DILSSTvfIFMo=";
    @Autowired
    private ConsentRepository consentRepository;
    @Autowired
    UserRepository userRepository;

    //-------------------------Receiving Callback APIs from ABDM and dispatching SSEs-----------------------------------

    @PostMapping("/v0.5/users/auth/on-init")
    public void onInit(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: ON-INIT " + response);
        String transactionId = util.getTransactionId(response);

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
        asyncCustomResponse.setAuthCode(accessToken);

        SseEmitter sseEmitter = emitters.get(requestId);
        sseEmitter.send(SseEmitter.event().name("ABDM-EVENT").data(asyncCustomResponse));
    }

    String requestId;
    @PostMapping("/v0.5/consent-requests/on-init")
    public void onConsentRequestInit(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: CONSENT-REQEUST-ON-INIT " + response);

        JSONObject jsonObject = new JSONObject(response);

        String consentId = (String) jsonObject.getJSONObject("consentRequest").get("id");

        consentRepository.updateConsentId(consentId, requestId);
        System.out.println("Consent Id updated in the table  ");
    }

    @Autowired
    private ArtifactsRepository artifactsRepository;
    @PostMapping("/v0.5/consents/hiu/notify")
    public void consentsHiuNotify(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: HIU NOTIFY " + response);

        JSONObject jsonObject = new JSONObject(response);
        String consentStatus = (String) jsonObject.getJSONObject("notification").get("status");

        Consent consentObj = consentRepository.findConsentByConsentId((String) jsonObject.getJSONObject("notification").get("consentRequestId"));

        consentRepository.updateStatus((String) jsonObject.getJSONObject("notification").get("status"),consentObj.getConsentId());
        if(!consentStatus.equals("GRANTED")) {

            System.out.println("CONSENT NOT GRANTED");
            return;
        }

        Patient patientObj = patientService.findPatientByHealthId(consentObj.patient.getHealthId());

        JSONArray artifactsArray = jsonObject.getJSONObject("notification").getJSONArray("consentArtefacts");

        for (int i=0;i<artifactsArray.length();i++)
        {
            Artifacts artifactsObj = new Artifacts();
            JSONObject obj = artifactsArray.getJSONObject(i);
            artifactsObj.consentArtifactId = (String) obj.get("id");
            artifactsObj.patient = patientObj;
            artifactsObj.consent = consentObj;
            artifactsRepository.save(artifactsObj);
        }
    }
    @Autowired
    ArtifactsHIPRepository artifactsHIPRepository;
    @PostMapping("/v0.5/consents/hip/notify")
    public void consentsHipNotify(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: CONSENTS HIP NOTIFY " + response);
        Consent consent = new Consent();
        JSONObject jsonObject= new JSONObject(response);
        consent.consentId= (String) jsonObject.getJSONObject("notification").getJSONObject("consentDetail").get("consentId");
        consent.requestedBy="HIP";
        consent.status="GRANTED";
        consentRepository.save(consent);

        //Now HIP sends an acknowledgement to the ABDM
        String consentStatus = util.getConsentStatus(response);
        if(!consentStatus.equals("GRANTED")) {
            System.out.println("CONSENT NOT GRANTED");
            return;
        }


//---------------------INSERTING DATA INTO ArtifactsHIP table--------------------
        ArtifactsHIP artifactsHIP = new ArtifactsHIP();
        artifactsHIP.artifactsId = (String) jsonObject.getJSONObject("notification").getJSONObject("consentDetail").get("consentId");
        artifactsHIP.patientHealthId = (String) jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONObject("patient").get("id");
        JSONArray careContextsArray = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONArray("careContexts");
        artifactsHIP.setCareContextIds(new ArrayList<>());
        for (int i=0;i<careContextsArray.length();i++)
        {
            JSONObject obj = careContextsArray.getJSONObject(i);
                artifactsHIP.careContextIds.add((String) obj.get("careContextReference"));
        }
        artifactsHIPRepository.save(artifactsHIP);

//-------------------------------------------------------------------------------

        String requestId = util.getABDMRequestID(response);
        ABDMSession session = new ABDMSession();
        session.setToken();
        String consentId = util.getConsentId(response);
        int ackRes = session.sendNotificationAcknowledgement(consentId, requestId);
        System.out.println("NOTIFICATION ACKNOWLEDGEMENT SENT STATUS: "+ackRes);
    }

    @PostMapping("v0.5/health-information/hip/request")
    public int healthInformationHipRequest(@RequestBody String response) throws Exception {
        try{
            System.out.println("ABDM RESPONSE: HEALTH-INFORMATION-HIP-REQUEST: " + response);
            JSONObject responseObject = new JSONObject(response);
            String consentArtefactId = (String) responseObject.getJSONObject("hiRequest").getJSONObject("consent").get("id");
            String dataPushUrl = (String) responseObject.getJSONObject("hiRequest").get("dataPushUrl");
            String publicKey = (String) responseObject.getJSONObject("hiRequest").getJSONObject("keyMaterial").getJSONObject("dhPublicKey").get("keyValue");
            String nonce = (String) responseObject.getJSONObject("hiRequest").getJSONObject("keyMaterial").get("nonce");
            ArtifactsHIP artifact = artifactsHIPRepository.findArtifactsHIPByArtifactsId(consentArtefactId);
            List<String> careContextListId = artifact.getCareContextIds();
            List<CareContext> careContextList = new ArrayList<>();

            ABDMSession abdmSession = new ABDMSession();
            abdmSession.setToken();

            for (String careContextId : careContextListId) {
                CareContext careContext = careContextRepository.getById(Integer.parseInt(careContextId));
                System.out.println("CARE_CONTEXT:" + careContext.getCareContextId());
                careContext.setPatient(patientRepository.findByHealthId(careContext.getPatient().getHealthId()));
                careContextList.add(careContext);
            }

            for (CareContext careContext : careContextList) {
                FhirUtility fhirUtility = new FhirUtility();

                Bundle bundle = fhirUtility.covertCareContextToBundle(careContext);
                if (bundle == null) {
                    continue;
                }
                FhirContext ctx = FhirContext.forR4();
                IParser parser = ctx.newJsonParser();
                String bundleString = parser.encodeResourceToString(bundle);
                System.out.println("BUNDLE CREATED");
                try{
                    FileWriter fw=new FileWriter("bundle",false );
                    fw.write(bundleString);
                    fw.close();
                }catch(Exception e){System.out.println(e);}
                System.out.println("Success...");
                System.out.println();

                String res = abdmSession.getEncryptionKeys();
                responseObject = new JSONObject(res);
                HIP_PRIVATE_KEY = responseObject.get("privateKey").toString();
                HIP_PUBLIC_KEY = responseObject.get("publicKey").toString();
                HIP_NONCE= responseObject.get("nonce").toString();

                String senderPublicKey = HIP_PUBLIC_KEY;
                String senderPrivateKey = HIP_PRIVATE_KEY;
                String senderNonce = HIP_NONCE;
                String encryptedResponse = abdmSession.getEncryptedData(dataPushUrl, bundleString, publicKey, nonce, senderPublicKey, senderPrivateKey, senderNonce);
                abdmSession.sendEncryptedData(dataPushUrl, encryptedResponse,senderNonce);
            }
            return 200;
        }catch (Exception e){
            e.printStackTrace();
            return 500;
        }
        //Now HIP sends an acknowledgement to the ABDM
    }
    @PostMapping("v0.5/health-information/hiu/receive-data")
    public int healthInformationHiuReceive(@RequestBody String response) throws Exception {
        System.out.println("ENCRYPTED RESPONSE FROM HIP RECEIVED: " + response.length());
        JSONObject jsonObject = new JSONObject(response);

        String encryptedData = jsonObject.get("encryptedData").toString();
        String senderPublicKey = jsonObject.get("keyToShare").toString();
        String senderNonce = jsonObject.get("nonce").toString();

        ABDMSession abdmSession = new ABDMSession();

        String receiverPublicKey = HIU_PUBLIC_KEY;
        String receiverPrivateKey = HIU_PRIVATE_KEY;
        String receiverNonce = HIU_NONCE;
        String response2 = abdmSession.getDecryptedData(encryptedData, senderPublicKey, senderNonce, receiverPrivateKey,receiverNonce,receiverPublicKey);
        System.out.println("RESPONSE AFTER DECRYPTION : "+ response2.length());

        JSONObject jsonObject1 = new JSONObject(response2);
        String decryptedStringData = (String) jsonObject1.get("decryptedData");

        try{
            FileWriter fw=new FileWriter("decryptedFile");
            fw.write(decryptedStringData);
            fw.close();
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("ERROR WHILE WRITING TO FILE");
        }
        System.out.println("REQUEST DECRYPTED AND SAVED...");
        System.out.println();
        return 200;
    }

    @PostMapping(value="/api/health-information/hiu/request")
    public int initiateDataTransfer(@RequestBody CustomRequest customRequest){
        try{

            String fromDate = customRequest.getFromDate();
            String toDate = customRequest.getToDate();
            String consentId = customRequest.getConsentId();

            System.out.println("REQUEST: HEALTH-INFORMATION-REQUEST : " + fromDate + "," + toDate + "," + consentId);

            ABDMSession abdmSession = new ABDMSession();

            String res = abdmSession.getEncryptionKeys();
            JSONObject responseObject = new JSONObject(res);
            HIU_PRIVATE_KEY = responseObject.get("privateKey").toString();
            HIU_PUBLIC_KEY = responseObject.get("publicKey").toString();
            HIU_NONCE= responseObject.get("nonce").toString();

            String publicKey = HIU_PUBLIC_KEY;
            String privateKey = HIU_PRIVATE_KEY;
            String nonce = HIU_NONCE;
            System.out.println("PUBLIC-KEY: "+publicKey);
            abdmSession.setToken();
            String UUIDCode = UUID.randomUUID().toString();

            int statusCode = abdmSession.healthInformationRequest(UUIDCode, fromDate, toDate,consentId, publicKey,nonce);

            System.out.println("STATUS-CODE" + statusCode);
            return  200;
        }
        catch (Exception e){
            e.printStackTrace();
            return 500;
        }
    }


    @PostMapping("/v0.5/health-information/hiu/on-request")
    public void healthInformationHIUONRequest(@RequestBody String response) throws Exception {
        System.out.println("ABDM RESPONSE: DATA HIU ON-REQUEST " );


        //Now HIP sends an acknowledgement to the ABDM
    }

    @PostMapping("/v0.5/consents/on-fetch")
    public void careContextsFetch(@RequestBody String response) throws Exception {
        System.out.println("CARE CONTEXT FETCH RESPONSE: " + response);


    }



    //---------------------------------Custom APIS for FRONTEND and Initiating SSEs-------------------------------------

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
    @PostMapping(value = "/api/patch")
    public int patchUrl(@RequestParam String url) throws Exception {
        System.out.println("REQUEST_PATCH_URL: ");
        ABDMSession session = new ABDMSession();
        session.setToken();
        String UUIDCode = UUID.randomUUID().toString();

        int statusCode = session.patchUrl(UUIDCode, url);

        System.out.println("STATUS: PATCH_URL: " + statusCode);
        return statusCode;
    }
    @Autowired
    public ConsentService consentService;
    @PostMapping(value = "/api/consent-requests/init")
    public int consentRequestInit(@RequestBody String consent) throws Exception {

        System.out.println("REQUEST: CONSENT-REQUEST INIT: \n" );

        ABDMSession session = new ABDMSession();
        session.setToken();
        requestId = UUID.randomUUID().toString();

        String temp = consent.substring(12,consent.length()-2).replace("\\", "");

        int statusCode = session.createConsentRequest(requestId, temp );
        if (statusCode == 202)
        {
            JSONObject jsonObject = new JSONObject(temp);

            Doctor doctorObj = doctorRepository.findDoctorsByRegistrationNumber((String) jsonObject.getJSONObject("requester").getJSONObject("identifier").get("value"));

            Consent consentObj = Consent.builder()
                    .requestId(requestId)
                    .purposeText((String) jsonObject.getJSONObject("purpose").get("text"))
                    .fromDate((String) jsonObject.getJSONObject("permission").getJSONObject("dateRange").get("from"))
                    .toDate((String) jsonObject.getJSONObject("permission").getJSONObject("dateRange").get("to"))
                    .eraseDate((String) jsonObject.getJSONObject("permission").get("dataEraseAt"))
                    .patient(patientService.findPatientByHealthId((String) jsonObject.getJSONObject("patient").get("id")))
                    .status("REQUESTED")
                    .doctor(doctorObj)
                    .requestedBy("HIU")
                    .build();
            consentService.saveConsent(consentObj);
        }

        System.out.println("STATUS: CONSENT-REQUEST INIT: " + statusCode);
        return statusCode;
    }
    @PostMapping(value = "/api/consent-requests/fetch-status")
    public Consent fetchConsentStatus(@RequestBody String consentRequestId) throws Exception {
        System.out.println("REQUEST_FETCH_STATUS: ");
        return consentRepository.findConsentByConsentId(consentRequestId);
    }

    @Autowired
    private PatientService patientService;

    @Autowired
    private UserService userService;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private VisitRepository visitRepository;
    @PostMapping(value = "/api/link/care-context")
    public int linkingCareContext(@RequestBody CustomRequest customRequest) throws Exception, IOException {



        System.out.println("\nIn Care Context linking");
        System.out.println("customRequest.getHealthRecord(): "+customRequest.getHealthRecord());
        ABDMSession session = new ABDMSession();
        CareContext careContext = new CareContext();

        LocalDate localDate = LocalDate.now();
        User userObj = userService.findUserByUsername(customRequest.getUsername());
        Doctor doctorObj = doctorRepository.findDoctorsByUserId(userObj.getUserId());
        Patient patientObj = patientService.findPatientByHealthId(customRequest.getHealthId());
        Visit visitObj = new Visit();

//------------Initializing care context object------
        careContext.patient = patientObj;
        careContext.display = customRequest.getDisplay();
        careContext.doctor = doctorObj;

//------------Initializing Visit object-------------
        visitObj.reasonOfVisit = customRequest.getReason();
        visitObj.diagnosis = customRequest.getDisplay();
        visitObj.dateOfVisit = localDate.toString();
        visitObj.careContext = careContext;
        visitObj.patient = patientObj;
        visitObj.doctor = doctorObj;
        visitObj.setHealthRecord(customRequest.getHealthRecord()!=null?customRequest.getHealthRecord().getBytes():null);

        List<Visit> newList = new ArrayList<>();
        newList.add(visitObj);
        careContext.setVisitList(newList);

        String patientReferenceNumber = careContext.patient.healthId;
        String displayPatientName = customRequest.getName();
        String display = careContext.display;
        String careContextReferenceNumber = ""+doctorService.addCareContext(careContext).getCareContextId();
        String linkToken = customRequest.getTransactionId(); //accessToken
        System.out.println("linkToken transactionId from Frontend: " + linkToken);
        session.setToken();
        System.out.println("Linking retreived token : " + session.getToken());

        System.out.println("\n"+patientReferenceNumber+" "+displayPatientName+" "+display+" "+careContextReferenceNumber+" "+linkToken);

        int statusCode = session.careContextLinking(patientReferenceNumber, displayPatientName, display, careContextReferenceNumber, linkToken);

        return statusCode;
    }

    //--------------------------------------Custom APIs for Database Related Queries------------------------------------
    @PostMapping(value = "api/link/assign-care-context")
    public int assigngCareContext(@RequestBody CustomRequest customRequest) throws Exception, IOException {

        System.out.println("REQUEST: ASSIGN-CARE-CONTEXT");
        ABDMSession session = new ABDMSession();

        CareContext careContext = careContextRepository.findCareContextsByCareContextId(Integer.parseInt(customRequest.getCareContextId()));
        LocalDate localDate = LocalDate.now();

        Visit visitObj = new Visit();

        visitObj.setDateOfVisit(localDate.toString());
        visitObj.setPatient(careContext.patient);
        visitObj.setDoctor(careContext.doctor);
        visitObj.setHealthRecord(customRequest.getHealthRecord()!=null?customRequest.getHealthRecord().getBytes():null);
        visitObj.setReasonOfVisit(customRequest.getReasonOfVisit());
        visitObj.setDiagnosis(customRequest.getDiagnosis());

        List<Visit> newList = careContext.getVisitList();
        newList.add(visitObj);
        careContext.setVisitList(newList);
        visitObj.setCareContext(careContext);


        doctorService.addCareContext(careContext);

        return 202;
    }

    @PostMapping("/api/patient/save")
    public boolean SavePatient(@RequestBody Patient patient)
    {
        try{
            System.out.println("Patient : " + patient.toString());
            return patientService.savePatient(patient);
        }catch (Exception e){
            return false;
        }
    }

    @PostMapping("/api/patient/all")
    public List<Patient> getAllPatients()
    {
        System.out.println("PATIENT-ALL");
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
    @Autowired
    private CareContextRepository careContextRepository;
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    AppointmentRepository appointmentRepository;
    @PostMapping("/api/appointments/create")
    public int createAppointment(@RequestBody CustomRequest customRequest) {
        try{
            Doctor doctor = doctorRepository.findDoctorByHealthId(customRequest.getDoctorHealthId());
            Patient patient = patientRepository.findByHealthId(customRequest.getHealthId());
            Appointment appointment = new Appointment();
            appointment.setDoctor(doctor);
            appointment.setPatient(patient);
            appointment.setDate(LocalDate.now().toString());
            Appointment appointment1 = appointmentRepository.save(appointment);
            int count = appointmentRepository.findAppointmentsByDoctorAndDate(appointment1.doctor, appointment1.date).size();
            return count;
        }
        catch(Exception e){
            e.printStackTrace();
            return -1;
        }
    }
    @PostMapping("/api/appointments/get-by-doctor-today")
    public List<Appointment> getAppointmentsByDoctor(@RequestBody CustomRequest customRequest) {
        try{
            Doctor doctor = doctorRepository.findDoctorByHealthId(customRequest.getHealthId());
            return appointmentRepository.findAppointmentsByDoctorAndDate(doctor, LocalDate.now().toString());
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping(value="/api/care-contexts/get-by-patient")
    public List<CareContext> getAllCareContextsByPatient(@RequestBody String healthId)
    {
        System.out.println("REQUEST: GET ALL CARE-CONTEXTS-BY-PATIENT"+healthId);
        Patient patient = patientRepository.findByHealthId(healthId);
        System.out.println(patient.toString());

        return careContextRepository.findCareContextsByPatient(patient);
    }



    @PostMapping(value = "/api/doctor/getByUsername/{username}")
    public Doctor getDoctorByUsername(@PathVariable String username) {
        System.out.println("REQUEST : GET-DOCTOR-BY-USERNAME: " +username);
        User user = userRepository.findUserByUsername(username);
        return doctorRepository.findDoctorsByUser(user);
    }

    //    ---------Admin Doctor services-------------
    @Autowired
    private AdminService adminDoctorService;

    @PostMapping("/api/admin/addDoctor")
    public Doctor saveDoctor(@RequestBody Doctor doctor)
    {
        User user = User.builder()
                .username(doctor.user.getUsername())
                .password(new BCryptPasswordEncoder().encode(doctor.user.getPassword()))
                .role(doctor.user.getRole())
                .build();
        doctor.setUser(user);
        return adminDoctorService.addDoctor(doctor);
    }
    @PostMapping(value="/api/admin/getAllDoctors")
    public List<Doctor> getAllDoctors()
    {
        return adminDoctorService.findDoctors();
    }

    @PostMapping("/api/admin/getDoctor/{healthIdNumber}")
    public Doctor getDoctor(@PathVariable String healthIdNumber)
    {
        return adminDoctorService.findDoctorByHealthId(healthIdNumber);
    }

    @DeleteMapping("/api/admin/deleteDoctor/{id}")
    public String deleteDoctor(@PathVariable int id)
    {
        return adminDoctorService.deleteDoctor(id);
    }
//
//    @PutMapping("/api/admin/updateDoctor")
//    public Doctor updateDoctor(@RequestBody Doctor doctor)
//    {
//        User user = User.builder()
//                .username(doctor.user.getUsername())
//                .password(new BCryptPasswordEncoder().encode(doctor.user.getPassword()))
//                .role(doctor.user.getRole())
//                .build();
//        doctor.setUser(user);
//
//        return adminDoctorService.updateDoctor(doctor);
//    }


    @PutMapping("/api/admin/updateDoctor")
    public void updateDoctor(@RequestBody Doctor doctor)
    {
//        Doctor existingDoctor = doctorRepository.findByHealthIdNumber(doctor.getHealthIdNumber());

        doctorRepository.updateDoctor(
                doctor.getHealthIdNumber(),
                doctor.getAddress(),
                doctor.getGender(),
                doctor.getName(),
                doctor.getMobile(),
                doctor.getDayOfBirth(),
                doctor.getMonthOfBirth(),
                doctor.getYearOfBirth(),
                doctor.getRegistrationNumber(),
                doctor.getHealthId(),
                doctor.getUser()
        );
    }
    //---------Admin Staff services------------------
    @Autowired
    private AdminService adminStaffService;
    @PostMapping("/api/admin/addStaff")
    public Staff saveStaff(@RequestBody Staff staff) {
        System.out.println("REQUEST ADD STAFF:");

        User user = User.builder()
                .username(staff.user.getUsername())
                .password(new BCryptPasswordEncoder().encode(staff.user.getPassword()))
                .role(staff.user.getRole())
                .build();
        staff.setUser(user);
        return adminStaffService.addStaff(staff);
    }

    @PostMapping("/api/admin/getAllStaffs")

    public List<Staff> getAllStaffs()
    {
        System.out.println("REQUEST GET-ALL-STAFFS");
        return adminStaffService.findStaffs();
    }

    @DeleteMapping("/api/admin/deleteStaff/{healthIdNumber}")

    public String deleteStaff(@PathVariable int healthIdNumber)
    {
        return adminStaffService.deleteStaff(healthIdNumber);
    }
//    @PutMapping("/api/admin/updateStaff")
//    public Staff updateStaff(@RequestBody Staff staff)
//    {
//        User user = User.builder()
//                .username(staff.user.getUsername())
//                .password(new BCryptPasswordEncoder().encode(staff.user.getPassword()))
//                .role(staff.user.getRole())
//                .build();
//        staff.setUser(user);
//
//        return adminStaffService.updateStaff(staff);
//    }

    @Autowired
    StaffRepository staffRepository;
    @PutMapping("/api/admin/updateStaff")
    public void updateStaff(@RequestBody Staff staff)
    {
        staffRepository.updateStaff(staff.healthIdNumber, staff.getAddress(), staff.getGender(), staff.getName(), staff.getMobile(), staff.getDayOfBirth(), staff.getMonthOfBirth(), staff.getYearOfBirth(), staff.getHealthId(), staff.getUser());
    }
    @PostMapping("/api/admin/getStaff/{healthIdNumber}")
    public Staff getStaff(@PathVariable String healthIdNumber)
    {
        return adminStaffService.findStaffByHealthId(healthIdNumber);
    }

}

