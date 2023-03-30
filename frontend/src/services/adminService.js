import axios from "axios";
const api = axios.create(
    {
        baseURL : 'http://localhost:9191/'
    }
);
const getDoctor = async (id) => {
    const response = await api.get(`api/admin/getDoctor/${id}`);
    return response;
};

const getalldoctor = async ()=>{
     const response = await api.get("api/admin/getAllDoctors");
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
