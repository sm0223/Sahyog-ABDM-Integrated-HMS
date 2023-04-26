import React, {useEffect, useState} from 'react';
import ConsentRequest from "./ConsentRequest";
import CreateVisit from "./CreateVisit";
import ViewPatientHistory from "./ViewPatientHistory";
import {Container} from "reactstrap";

const PatientVisit = ({user}) => {
  const falseState = {
    home: false,
    createConsentRequest: false,
    viewConsentStatus: false,
    viewPatientHistory: false,
    assignCareContext: false,
    createNewCareContext: false,
  }
  const [state, setState] = useState({
    home: true,
    createConsentRequest: false,
    viewConsentStatus: false,
    viewPatientHistory: false,
    assignCareContext: false,
    createNewCareContext: false,
  });
  const handleDashboard = (action) => {
    console.log("action", action)
    switch (action) {
      case "HOME" :
        setState({
          ...falseState,
          home: true
        })
        break;
      case "CREATE-CONSENT-REQUEST":
        setState({
          ...state,
          createConsentRequest: true
        })
        break;
      case "CLOSE-CONSENT-REQUEST":
        setState({
          ...state,
          createConsentRequest: false
        })
        break;
      case "VIEW-PATIENT-HISTORY":
        setState({
          ...state,
          viewPatientHistory: true
        })
        break;

      case "CLOSE-PATIENT-HISTORY":
        setState({
          ...state,
          viewPatientHistory: false
        })
        break;

      default :
        setState({
          ...falseState,
          home: true
        })
    }
  }

  const [visit, setVisit] = useState({
    patient: null,
    reasonOfVisit : "",
    diagnosis : "",
    healthRecord: null
  })

  return (
      <Container>
        {state.home && <CreateVisit
            user ={user}
            visit = {visit}
            setVisit = {setVisit}
            handleDashboard = {handleDashboard}
        />
        }
        {<ConsentRequest modal={state.createConsentRequest} handleDashboard={handleDashboard} user = {user} patient = {visit.patient} setModal = {setState} />}
        {state.viewPatientHistory&&<ViewPatientHistory modal={state.viewPatientHistory} handleDashboard={handleDashboard} user = {user} patient = {visit.patient} setModal = {setState} />}
      </Container>
  );
};

export default PatientVisit;
