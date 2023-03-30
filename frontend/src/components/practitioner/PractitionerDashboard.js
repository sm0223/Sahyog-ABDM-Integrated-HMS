import React, {useState} from 'react'
import {Container} from 'react-bootstrap';
import PractitionerHome from "./PractitionerHome";
import ViewAllConsents from "./ViewAllConsents";
import MySchedule from "./MySchedule";
import CreateVisit from "./CreateVisit";
export default function PractitionerDashboard({user}) {
  const falseState = {
    practitionerHome : false,
    createVisit : false,
    viewAllConsents : false,
    mySchedule: false
  }

  const [state, setState] = useState({
    practitionerHome : true,
    createVisit : false,
    viewAllConsents : false,
    mySchedule: false
  })
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
          createVisit:true
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
        break;
      case "DISCHARGE-PATIENT":
        newState = {
          ...falseState,
          mySchedule:true
        }
        setState(newState)
        break;
        break;
      default:
    }
  }
  return (
    <Container>
      {state.practitionerHome && <PractitionerHome user = {user} handleDashboard = {handleDashboard} />}
      {state.createVisit && <CreateVisit user = {user} handleDashboard = {handleDashboard} />}
      {state.viewAllConsents && <ViewAllConsents user = {user} handleDashboard = {handleDashboard} />}
      {state.mySchedule && <MySchedule user = {user} handleDashboard = {handleDashboard} />}
    </Container>
  )
}
