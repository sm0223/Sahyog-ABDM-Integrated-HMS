import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
      baseURL : configData['url']
    }
);

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


const aService = { getDoctor,addDoctor,getalldoctor,deletedoctor,updateDoctor }
export default aService
