import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
        baseURL : configData['url']
    }
);

// -------Doctor Services--------------

const patchUrl = async (url) => {
    const response = await api.post(`api/patch?url=`+url);
    return response.data;
};
const getDoctor = async (id) => {
    const response = await api.post(`api/admin/getDoctor/${id}`);
    return response;
};

const getalldoctor = async ()=>{
    const response = await api.post("api/admin/getAllDoctors");
    return response;
};
const addDoctor = async (doctor) =>{
    await api.post("api/admin/addDoctor", doctor);
};


const updateDoctor = async (doctor)=>{
    await api.put("api/admin/updateDoctor", doctor);
}
const deletedoctor = async (id) =>{
    await api.delete(`api/admin/deleteDoctor/${id}`);
};

// -------Staff Services--------------

const getStaff = async (id) => {
    const response = await api.post(`api/admin/getStaff/${id}`);
    return response;
};

const getallstaff = async ()=>{
    const response = await api.post("api/admin/getAllStaffs");
    return response;
};
const addStaff = async (staff) =>{
    await api.post("api/admin/addStaff", staff);
};


const updateStaff = async (staff)=>{
    await api.put("api/admin/updateStaff", staff);
}
const deletestaff = async (id) =>{
    await api.delete(`api/admin/deleteStaff/${id}`);
};


const aService = { patchUrl, getDoctor,addDoctor,getalldoctor,deletedoctor,updateDoctor, getStaff,addStaff,getallstaff,deletestaff,updateStaff}
export default aService
