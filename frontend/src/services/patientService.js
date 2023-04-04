import axios from 'axios';
import configData from './apiConfig.json'
const api = axios.create(
    {
        baseURL : configData['url']
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
    // const response = await api.get('api/patient/details',{
    //     params: {
    //         healthId: healthId
    //     }
    // });
    //
    // const data = JSON.parse(response.data.substring(5));
    // console.log(data)
    // return data;
    return {
        id : "P-001",
        healthId : "shubham0223@sbx",
        name : "Shubham Mondal",
        gender : "Male",
        address : {
            line: "Raniganj",
            district: "Burdwan",
            state: "West Bengal"
        },
        yearOfBirth : 1998,
        monthOfBirth : 2,
        dayOfBirth : 23,
        healthNumber : "91-8123-4314-12",
        mobile : "8436089576"
    }
}
const getAllPatientsWithDoctor = async (healthId) => {
    const response = await api.post('api/register/details');
    const data = JSON.parse(response.data.substring(5));
    return data;
}


const gService = { registerUsingHealthId, sendOtpForPatientRegistration, registerPatient , getPatientFromHealthId, getAllPatientsWithDoctor}


export default gService