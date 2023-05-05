package com.sahyog.backend.utilities;

import com.sahyog.backend.entities.CareContext;
import com.sahyog.backend.entities.Visit;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hl7.fhir.r4.model.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
@NoArgsConstructor
public class FhirUtility {
    public Composition getCompositionFromCareContext(CareContext careContext) {

        Composition composition = new Composition();
        composition.setId("comp-"+careContext.getCareContextId());
        //SETTING record status as FINAL
        composition.setStatus(Composition.CompositionStatus.FINAL);
        //SETTING TYPE OF RECORD
        composition.setType(new CodeableConcept(new Coding(
                "http://snomed.info/sct",
                "371530004",
                "Clinical Consultation Report"))); // SETTING record type
        //SETTING SUBJECT REFERENCE
        Reference patientReference = new Reference("Patient/"+"patient-"+careContext.getPatient().healthId);
        patientReference.setDisplay(careContext.getPatient().name);
        composition.setSubject(patientReference);

        //SETTING AUTHOR REFERENCE
        Reference practitionerReference = new Reference("Practitioner/"+"practitioner-"+careContext.getDoctor().healthId);
        practitionerReference.setDisplay(careContext.getDoctor().name);
        composition.setAuthor(Collections.singletonList(practitionerReference));
        //SETTING ENCOUNTER REFERENCE
        Reference encounterReference = new Reference("Encounter/"+"encounter-"+careContext.getCareContextId());
        composition.setEncounter(encounterReference);
        //SETTING DATE
        try {
            Visit visit= careContext.getVisitList().get(careContext.getVisitList().size()-1);
            composition.setDate(new SimpleDateFormat("yyyy-mm-dd").parse(visit.dateOfVisit));
        } catch (Exception e) {
            composition.setDate(new Date());
        };
        //SETTING TITLE
        composition.setTitle(careContext.display);
        //SETTING SECTION
        Composition.SectionComponent sectionComponent = new Composition.SectionComponent();
        List<Reference> referenceList = new ArrayList<>();
        for(Visit visit :careContext.getVisitList()){
            Reference reference = new Reference("Binary/"+"visit-doc-"+visit.getVisitId());
            reference.setDisplay("Visit Document"+ visit.getVisitId());
        }
        sectionComponent.setEntry(referenceList);
        composition.setSection(Collections.singletonList(sectionComponent));

        return composition;
    }
    public Binary getBinaryFromVisit(Visit visit) {
        Binary binary = new Binary();
        binary.setId("visit-doc-"+visit.getVisitId());
        try{
            if(visit.getHealthRecord() == null) throw new Exception();
            String decodedString = new String(visit.getHealthRecord());
            String contentType = decodedString.split(":",2)[1].split(";",2)[0];//data:application/pdf;base64
            binary.setContentType(contentType);
            binary.setContent(visit.healthRecord);
            return binary;
        }
        catch(Exception e) {
            System.out.println("EXCEPTION:  "+e.toString());
            String jsonData = "{\"reasonOfVisit\":\""+visit.reasonOfVisit+"\",\"diagnosis\":\"'"+visit.diagnosis+"\"}";
            binary.setContentType("application/json");
            binary.setContent(Base64.getEncoder().encodeToString(jsonData.getBytes()).getBytes());
            return binary;
        }
    }
    public Patient getPatient(CareContext careContext){
        Patient patient = new Patient();
        //SETTING ID
        patient.setId("patient-"+careContext.getPatient().getHealthId());
        //SETTING IDENTIFIER
        Identifier identifier = new Identifier();
        identifier.setType((new CodeableConcept(new Coding(
                "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-identifier-type-code",
                "ABHA",
                "Ayushman Bharat Health Account (ABHA) ID"))));
        identifier.setSystem("https://healthid.ndhm.gov.in");
        identifier.setValue(careContext.getPatient().getHealthId());
        patient.setIdentifier(Collections.singletonList(identifier));
        return patient;
    }
    public Practitioner getPractitioner(CareContext careContext)  {
        Practitioner practitioner = new Practitioner();
        //SETTING ID
        practitioner.setId("practitioner-"+careContext.getDoctor().getHealthId());
        //SETTING IDENTIFIER
        Identifier identifier = new Identifier();
        identifier.setType((new CodeableConcept(new Coding(
                "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-identifier-type-code",
                "ABHA",
                "Ayushman Bharat Health Account (ABHA) ID"))));
        identifier.setSystem("https://healthid.ndhm.gov.in");
        identifier.setValue(careContext.getDoctor().getHealthId());
        practitioner.setIdentifier(Collections.singletonList(identifier));
        return practitioner;
    }
    public Encounter getEncounter(CareContext careContext) {
        Encounter encounter = new Encounter();
        //SETTING ID
        encounter.setId("encounter-"+careContext.getCareContextId());
        encounter.setStatus(Encounter.EncounterStatus.FINISHED);
        encounter.setClass_(new Coding(
                "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                "AMB",
                "ambulatory"));
        return encounter;
    }
    public Bundle covertCareContextToBundle(CareContext careContext) {
        try{
            Bundle bundle = new Bundle();

            //SETTING ID of the Bundle
            bundle.setId(UUID.randomUUID().toString());
            //SETTING META data of the Bundle
            bundle.setMeta(new Meta().setVersionId("1"));
            //SETTING Identifiers
            bundle.setIdentifier(new Identifier()
                    .setSystem("sahyog-hip-facility-iiitb")
                    .setValue("bundle-" + careContext.getCareContextId()));
            //SETTING Type of bundle
            bundle.setType(Bundle.BundleType.DOCUMENT);
            //SETTING DATE TIME of Bundle
            bundle.setTimestamp(new Date());
            //CREATING ENTRY list
            List<Bundle.BundleEntryComponent> bundleEntryComponentList = new ArrayList<>();
            //CREATING FIRST COMPONENT=COMPOSITION COMPONENT
            Bundle.BundleEntryComponent compositionEntry = new Bundle.BundleEntryComponent();
            compositionEntry.setFullUrl("Composition/" + "comp-" + careContext.getCareContextId());
            compositionEntry.setResource(getCompositionFromCareContext(careContext));
            //SETTING COMPOSITION ENTRY
            bundleEntryComponentList.add(compositionEntry);
            //SETTING PATIENT ENTRY
            Bundle.BundleEntryComponent patientEntry = new Bundle.BundleEntryComponent();
            patientEntry.setFullUrl("Patient/" + "patient-" + careContext.getPatient().getHealthId());
            patientEntry.setResource(getPatient(careContext));
            //SETTING PRACTITIONER ENTRY
            Bundle.BundleEntryComponent practitionerEntry = new Bundle.BundleEntryComponent();
            patientEntry.setFullUrl("Practitioner/" + "practitioner-" + careContext.getDoctor().getHealthId());
            patientEntry.setResource(getPatient(careContext));
            //SETTING ENCOUNTER ENTRY
            Bundle.BundleEntryComponent encounterEntry = new Bundle.BundleEntryComponent();
            encounterEntry.setFullUrl("Encounter/" + "encounter-" + careContext.getCareContextId());
            encounterEntry.setResource(getEncounter(careContext));
            //SETTING VISIT BINARY-ies
            for (Visit visit : careContext.getVisitList()) {
                Bundle.BundleEntryComponent bundleEntryComponent = new Bundle.BundleEntryComponent();
                bundleEntryComponent.setFullUrl("Binary/" + "visit-doc-" + visit.getVisitId());
                bundleEntryComponent.setResource(getBinaryFromVisit(visit));
                bundleEntryComponentList.add(bundleEntryComponent);
            }
            //SETTING ENTRY TO THE CREATED BUNDLE ENTRY
            bundle.setEntry(bundleEntryComponentList);
            return bundle;
        }
        catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
}
