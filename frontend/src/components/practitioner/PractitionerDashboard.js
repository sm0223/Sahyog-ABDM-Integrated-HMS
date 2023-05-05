import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap';
import PractitionerHome from "./PractitionerHome";
import ViewAllConsents from "./ViewAllConsents";
import MySchedule from "./MySchedule";
import PatientVisit from "./PatientVisit";
import doctorService from "../../services/doctorService";
export default function PractitionerDashboard({user}) {
  const falseState = {
    practitionerHome : false,
    patientVisit : false,
    viewAllConsents : false,
    mySchedule: false
  }
  const [state, setState] = useState({
    practitionerHome : true,
    patientVisit : false,
    viewAllConsents : false,
    mySchedule: false
  })
  const getAppointmentList = ()=>{
    const response = doctorService.getAppointmentListToday();
    console.log(response)

  }
  const handleDashboard = (action) => {
    console.log(action)
    let newState={}
    switch (action) {
      case "STAFF-HOME":
        newState = {
          ...falseState,
          practitionerHome:true
        }
        setState(newState)
        break;
      case "GET-PATIENT":
        newState = {
          ...falseState,
          patientVisit:true
        }
        setState(newState)
        break;
      case "REGISTER-PATIENT":
        newState = {
          ...falseState,
          viewAllConsents:true
        }
        setState(newState)
        break;
      case "DISCHARGE-PATIENT":
        newState = {
          ...falseState,
          mySchedule:true
        }
        setState(newState)
        break;
      default:
    }
  }
  useEffect(() => {
    return () => {
      getAppointmentList();
    };
  }, []);

  return (
    <Container>
      {state.practitionerHome && <PractitionerHome user = {user} handleDashboard = {handleDashboard} />}
      {state.patientVisit && <PatientVisit user = {user} handleDashboard = {handleDashboard} />}
      {state.viewAllConsents && <ViewAllConsents user = {user} handleDashboard = {handleDashboard} />}
      {state.mySchedule && <MySchedule user = {user} handleDashboard = {handleDashboard} />}
    </Container>
  )
}
