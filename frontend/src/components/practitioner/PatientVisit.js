import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import patientService from "../../services/patientService";
import login from "../Login";
import ConsentRequest from "./ConsentRequest";
import CreateVisit from "./CreateVisit";

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
      case "CONSENT-REQUEST":
        setState({
          ...falseState,
          createConsentRequest: true
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
    pdf: null
  })

  return (
      <>
        {state.home && <CreateVisit
            user ={user}
            visit = {visit}
            setVisit = {setVisit}
            handleDashboard = {handleDashboard}
        />
        }
        {<ConsentRequest modal={state.createConsentRequest} user = {user} patient = {visit.patient} />
        }
      </>
  );
};

export default PatientVisit;
