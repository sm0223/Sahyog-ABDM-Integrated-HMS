import React, {useState} from 'react';
import StaffHome from "./StaffHome";
import RegisterPatient from "./RegisterPatient";
import GetPatientUsingHealthId from "./GetPatientUsingHealthId";

const StaffDashboard = ({user}) => {
  const initialStaffState = {
    staffHome : false,
    getPatientUsingHealthId : false,
    registerPatient : false,
    dischargePatient: false
  }

  const [staffState, setStaffState] = useState({
    staffHome : true,
    getPatientUsingHealthId : false,
    registerPatient : false,
    dischargePatient: false
  })
  const handleStaffDashboard = (action) => {
    console.log(action)
    let newState={}
    switch (action) {
      case "STAFF-HOME":
        newState = {
          ...initialStaffState,
          staffHome:true
        }
        setStaffState(newState)
        break;
      case "GET-PATIENT":
        newState = {
          ...initialStaffState,
          getPatientUsingHealthId:true
        }
        setStaffState(newState)
        break;
      case "REGISTER-PATIENT":
        newState = {
          ...initialStaffState,
          registerPatient:true
        }
        setStaffState(newState)
        break;
        break;
      case "DISCHARGE-PATIENT":
        newState = {
          ...initialStaffState,
          dischargePatient:true
        }
        setStaffState(newState)
        break;
        break;
      default:
    }
  }
  const [patient, setPatient] = useState(null);
  const handleRegisterPatient = (event) => {
    console.log(event)
  }
  return (
    <div>
      {staffState.staffHome && <StaffHome handleDashboard = {handleStaffDashboard} />}
      {staffState.registerPatient &&
          <RegisterPatient
              patient = {patient}
              handleDashboard = {handleStaffDashboard}
              handleRegisterPatient={handleRegisterPatient}
          />
      }
      {staffState.getPatientUsingHealthId &&
          <GetPatientUsingHealthId
              user = {user}
              handleStaffDashboard = {handleStaffDashboard}
              setPatient={setPatient}
          />
      }

    </div>
  );

};

export default StaffDashboard;
