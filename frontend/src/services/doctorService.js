import axios from "axios";
import configData from './apiConfig.json'

const api = axios.create(
    {
      baseURL : configData['url']
    }
);

const createNewCareContext = async (accessToken,patientId,patientName,diagnosis, reason, username) => {
  const temp = {
    healthId: patientId,
    transactionId: accessToken,
    name: patientName,
    display: diagnosis,
    reason: reason,
    username: username
  }
  console.log("temp " , temp)
  try {
    const response = await api.post("api/link/care-context", temp, {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    return response;
  }
  catch (err) {
    throw new Error("Unable to create new care-context in Server")
  }

}
const getAllCareContextFromPatientID = async (visit, careContextDisplayName) => {
  console.log("visit: ", visit)
  console.log("careContextDisplayName", careContextDisplayName)
  try {
    const response = await api.post("api/doctor/care-context/create", {
      visit: visit,
      displayName: careContextDisplayName
    }, {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    return response;
  }
  catch (err) {
    throw new Error("Unable to create new care-context in Server")
  }
}

const consentRequestInit = async (consent) => {
  console.log("consent: ", JSON.stringify(consent))
  try {
    const response = await api.post("/api/consent-requests/init", {
      consent: JSON.stringify(consent)
    },{
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    return response;
  }
  catch (err) {
    throw new Error("Unable to create new Consent-request in Server")
  }
}
const getDoctorByUsername = async(username) => {
  console.log("consent: ", JSON.stringify({username}))
  try {
    const response = await api.post(`/api/doctor/getByUsername/${username}`,
        null,
        {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    return response.data;
  }
  catch (err) {
    throw new Error("Unable to create new Consent-request in Server")
  }
}
export default {consentRequestInit, createNewCareContext, getDoctorByUsername}