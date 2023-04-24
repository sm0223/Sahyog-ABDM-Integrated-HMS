import React, {useState} from 'react';
import StaffHome from "./StaffHome";
import RegisterPatient from "./RegisterPatient";
import GetPatientUsingHealthId from "./GetPatientUsingHealthId";
import CreateAppointment from "./CreateAppointment";

const StaffDashboard = ({user}) => {
  const initialStaffState = {
    staffHome : false,
    getPatientUsingHealthId : false,
    registerPatient : false,
    dischargePatient: false,
    createAppointment: false
  }

  const [staffState, setStaffState] = useState({
    staffHome : true,
    getPatientUsingHealthId : false,
    registerPatient : false,
    dischargePatient: false,
    createAppointment: false
  })
  const handleDashboard = (action) => {
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
      case "CREATE_APPOINTMENT":
        newState = {
          ...initialStaffState,
          createAppointment: true
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

  return (
    <div>
      {staffState.staffHome && <StaffHome handleDashboard = {handleDashboard} />}
      {staffState.getPatientUsingHealthId &&
          <><h1>Register Patient </h1>
          <GetPatientUsingHealthId
              user = {user}
              handleDashboard= {handleDashboard}
              setPatient={setPatient}
          />
          </>
      }
      {staffState.registerPatient &&
          <RegisterPatient
              patient = {patient}
              handleDashboard = {handleDashboard}
              setPatient={setPatient}
          />
      }
      {staffState.createAppointment&& <CreateAppointment
          user ={user}
          patient={patient}

          />
      }
    </div>
  );

};

export default StaffDashboard;
