import {useState} from "react";
import registrationService from "../../services/patientService";
const GetPatientUsingHealthId = ({user, handleDashboard, setPatient})=> {
  const [state, setState] = useState({
    showOTPInput: false,
    errorMessage:""
  });
  const [healthId, setHealthId] = useState("");
  const [otp, setOTP] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const handleSubmit = async (event)=> {
    event.preventDefault()
    console.log("ss",healthId)
    const transactionId = await registrationService.registerUsingHealthId(healthId);
    setState({
      showOTPInput:true,
      errorMessage:""
    })
    setTransactionID(transactionId)
  }
  const handleOTPSubmit = async (event)=> {
    event.preventDefault()
    const responseRaw = await registrationService.sendOtpForPatientRegistration(healthId, transactionID, otp)
    const response = JSON.parse(responseRaw)

    setPatient({
      healthId: response.id,
      name: response.name,
      gender: response.gender,
      yearOfBirth: response.yearOfBirth,
      monthOfBirth: response.monthOfBirth,
      dayOfBirth: 3,
      address: {
        line: response.address ? response.address.line : null,
        district: response.address ? response.address.district : null,
        state: response.address ? response.address.state : null,
        pincode: response.address ? response.address.pincode : null,
      },
      mobile: response.identifiers.find(identifier=>identifier.type==="MOBILE").value,
      healthNumber: response.identifiers.find(identifier=>identifier.type==="HEALTH_NUMBER").value,
    })
    handleDashboard("REGISTER-PATIENT")
  }
  const changeHealthId = (event)=> {
    event.preventDefault()
    setHealthId(event.target.value)
  }
  const changeOTP = (event)=> {
    event.preventDefault()
    setOTP(event.target.value)
  }

  return (
      <div className="container">
        <h1>Register Patient </h1>
        <form onSubmit={handleOTPSubmit}>
          <div className="form">
            <label htmlFor="email">Health ID</label><br/>
            <input className="input" type="text" id="healthId"  onChange={changeHealthId}/> <br/>
            {state.showOTPInput&& <div> <label htmlFor="email">Enter OTP </label> <br/>
              <input type="text" id="otp" onChange={changeOTP}/>
            </div>}<br/>
          </div>
          {!state.showOTPInput && <button className= "btn btn-primary" type="button" onClick={handleSubmit}> Submit</button>}
          {state.showOTPInput && <button type="submit" className= "btn btn-primary" onClick={handleOTPSubmit}> Verify OTP</button>}
        </form>
      </div>
  );
}
export default GetPatientUsingHealthId;