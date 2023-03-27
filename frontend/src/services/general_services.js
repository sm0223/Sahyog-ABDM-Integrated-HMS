import axios from 'axios';

const api = axios.create(
    {
        baseURL : 'https://dea4-119-161-98-68.in.ngrok.io/'
    }
);

const registerUsingAbhaAddress = async (healthId) => {
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
    const response = await api.post('api/register/save', patient);
    const data = JSON.parse(response.data.substring(5));
    return data;
}


const gService = { registerUsingAbhaAddress, sendOtpForPatientRegistration, registerPatient }


export default gService