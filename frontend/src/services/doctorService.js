import axios from "axios";
import configData from './apiConfig.json'

const api = axios.create(
    {
      baseURL : configData['url']
    }
);

const createNewCareContext = async (accessToken,patientId,patientName,display) => {
  const temp = {
    healthId: patientId,
    transactionId: accessToken,
    name: patientName,
    display: display
  }
  console.log("temp " , temp)
  try {
    const response = await api.post("api/link/care-context", temp)
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
    })
    return response;
  }
  catch (err) {
    throw new Error("Unable to create new care-context in Server")
  }
}

const createConsentRequest = async (consent) => {
  console.log("consent: ", JSON.stringify(consent))
  try {
    const response = await api.post("api/doctor/consent/create", {
      consent: JSON.stringify(consent)
    })
    return response;
  }
  catch (err) {
    throw new Error("Unable to create new Consent-request in Server")
  }
}

export default {createConsentRequest, createNewCareContext}