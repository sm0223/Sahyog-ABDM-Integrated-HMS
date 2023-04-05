import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
      baseURL : configData['url']
    }
);

const createNewCareContext = async (visit, careContextDisplayName) => {
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
export default {createNewCareContext}