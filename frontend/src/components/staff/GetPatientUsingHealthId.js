import {useState} from "react";
import registrationService from "../../services/registrationService";
const GetPatientUsingHealthId = ({user, setPatient})=> {
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
    const response = await registrationService.sendOtpForPatientRegistration(healthId, transactionID, otp)
    console.log(response)
    setPatient(response)
    handle
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
        <form >
          <div className="form">
            <label htmlFor="email">Health ID</label><br/>
            <input className="input" type="text" id="healthId"  onChange={changeHealthId}/> <br/>
            {state.showOTPInput&& <div> <label htmlFor="email">Enter OTP </label> <br/>
              <input type="text" id="otp" onChange={changeOTP}/>
            </div>}<br/>
          </div>
          {!state.showOTPInput && <button className= "btn btn-primary" type="button" onClick={handleSubmit}> Submit</button>}
          {state.showOTPInput && <button type="button" className= "btn btn-primary" onClick={handleOTPSubmit}> Verify OTP</button>}
        </form>
      </div>
  );
}
export default GetPatientUsingHealthId;