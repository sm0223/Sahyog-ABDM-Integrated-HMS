import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
        baseURL : configData['url']
    }
);

// -------Doctor Services--------------

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
    const response=await api.post("api/admin/addDoctor", doctor);
    return response;
};


const updateDoctor = async (doctor)=>{
    const response=await api.put("api/admin/updateDoctor", doctor);
    return response;
}
const deletedoctor = async (id) =>{
    const response=await api.delete(`api/admin/deleteDoctor/${id}`);
    return response;
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
  console.log(staff)
  const response=await api.post("api/admin/addStaff", staff);
  return response;
};


const updateStaff = async (staff)=>{
    const response=await api.put("api/admin/updateStaff", staff);
    return response;
};
const deletestaff = async (id) =>{
    const response=await api.delete(`api/admin/deleteStaff/${id}`);
    return response
};


const aService = { patchUrl, getDoctor,addDoctor,getalldoctor,deletedoctor,updateDoctor, getStaff,addStaff,getallstaff,deletestaff,updateStaff}
export default aService
