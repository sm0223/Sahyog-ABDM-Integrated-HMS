import axios from 'axios';
import configData from './apiConfig.json'
const api = axios.create(
    {
        baseURL : configData['url']
    }
);
api.interceptors.request.use(
    config =>{
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

const registerUsingHealthId = async (healthId) => {
    console.log(healthId);
    const response = await api.post('api/register/health-id', {"healthId": healthId});
    console.log("as " + response.data);
    const data = JSON.parse(response.data.substring(5));
    return data.transactionId;
}
const sendOtpForPatientRegistration = async(healthId, transactionId, mobileOTP) => {
    console.log(transactionId+"trans");
    const response = await api.post('api/register/confirmMobileOTP',
        {"healthId" : healthId, "transactionId": transactionId, "mobileOTP":mobileOTP});
    const data = JSON.parse(response.data.substring(5));
    return data.patient;
}
const sendOtpForCareContextLinking = async(healthId, transactionId, mobileOTP) => {
    console.log(transactionId+"trans");
    const response = await api.post('api/register/confirmMobileOTP',
        {"healthId" : healthId, "transactionId": transactionId, "mobileOTP":mobileOTP});
    const data = JSON.parse(response.data.substring(5));
    return data.authCode;
}

const registerPatient = async(patient) => {
    console.log(patient+"trans");
    const response = await api.post('api/patient/save', patient);
    const data = JSON.parse(response.data);
    return data;
}
const getPatientFromHealthId = async (healthId) => { //Returns Patient Data in object form
    const response = (await api.post('api/patient/' + healthId));
    console.log("response " , response)
    return response.data;

}
const getAllPatients = async () => {
    const response = await api.post('api/patient/all');
    console.log("response " , response)
    return response.data;

}
const getAllPatientsWithDoctor = async (healthId) => {
    const response = await api.post('api/register/details');
    const data = JSON.parse(response.data.substring(5));
    return data;
}


const gService = {getAllPatients ,sendOtpForCareContextLinking ,registerUsingHealthId, sendOtpForPatientRegistration, registerPatient , getPatientFromHealthId, getAllPatientsWithDoctor}


export default gService