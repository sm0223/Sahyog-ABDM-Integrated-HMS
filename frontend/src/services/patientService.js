import axios from 'axios';

const api = axios.create(
    {
        baseURL : 'https://2b5a-103-156-19-229.in.ngrok.io'
    }
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
    const response = await api.post('api/register/confirmMobileOTP', {"healthId" : healthId, "transactionId": transactionId, "mobileOTP":mobileOTP});
    const data = JSON.parse(response.data.substring(5));
    return data.patient;
}

const registerPatient = async(patient) => {
    console.log(patient+"trans");
    const response = await api.post('api/patient/save', patient);
    const data = JSON.parse(response.data.substring(5));
    return data;
}
const getPatientFromHealthId = async (healthId) => {
    const response = await api.get('api/patient',{
        params: {
            healthId: healthId
        }
    });
    const data = JSON.parse(response.data.substring(5));
    console.log("asdfadffd",data)
    return data;
}
const getAllPatientsWithDoctor = async (healthId) => {
    const response = await api.post('api/register/details');
    const data = JSON.parse(response.data.substring(5));
    return data;
}


const gService = { registerUsingHealthId, sendOtpForPatientRegistration, registerPatient , getPatientFromHealthId, getAllPatientsWithDoctor}


export default gService