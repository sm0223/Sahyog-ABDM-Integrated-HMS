import {useState} from "react";
import registrationService from "../../services/patientService";
import configData from "../../services/apiConfig.json";
import { fetchEventSource } from '@microsoft/fetch-event-source';

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
    await fetchEventSource(configData['url']+ "/api/register/health-id", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"healthId": healthId}),
      onmessage(response) {
        console.log("response " , response.data)
        setTransactionID(JSON.parse(response.data).transactionId)
        setState({
          ...state,
          showOTPInput:true,
        })
      },
      onclose(){
        console.log("closed")
      },
      onerror(error){
        console.log("error ", error)
      }
    })
  }
  // const handleOTPSubmit = async (event)=> {
  //   event.preventDefault()
  //   const responseRaw = await registrationService.sendOtpForPatientRegistration(healthId, transactionID, otp)
  //   const response = JSON.parse(responseRaw)

  //   
  //   handleDashboard("REGISTER-PATIENT")
  // }
  const handleOTPSubmit = async (event)=> {
    event.preventDefault()

    await fetchEventSource(configData['url']+ "/api/register/confirmMobileOTP", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"healthId" : healthId, "transactionId": transactionID, "mobileOTP":otp}),

      onmessage(response) {
        console.log("response " , response)
        const res = JSON.parse(JSON.parse(response.data).patient);
        console.log("res",res);
        setPatient({
              healthId: res.id,
              name: res.name,
              gender: res.gender,
              yearOfBirth: res.yearOfBirth,
              monthOfBirth: res.monthOfBirth,
              dayOfBirth: 3,
              address: {
                line: res.address ? res.address.line : null,
                district: res.address ? res.address.district : null,
                state: res.address ? res.address.state : null,
                pincode: res.address ? res.address.pincode : null,
              },
              mobile: res.identifiers?res.identifiers.find(identifier=>identifier.type==="MOBILE").value:null,
              healthNumber: res.identifiers?res.identifiers.find(identifier=>identifier.type==="HEALTH_NUMBER").value:null,
            })
        handleDashboard("REGISTER-PATIENT")
      },
      onclose(){
        console.log("closed")
      },
      onerror(error){
        console.log("error ", error)
      }
    })
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