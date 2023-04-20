import React, {useEffect, useState} from 'react';
import patientService from "../../services/patientService";
import doctor from "./Doctor";
import doctorService from "../../services/doctorService";
import adminService from "../../services/adminService";

const AdminHome = () => {
    const inititalStats = {
        noPatients: 0,
        noDoctors: 0,
        noStaffs: 0
    }
    const [stats , setStats] = useState(inititalStats)
    const listGet = async () => {
        const resultPatients = await patientService.getAllPatients()
        const resultDoctors = await adminService.getalldoctor()
        const resultStaffs = await adminService.getallstaff()
        setStats({noPatients: resultPatients.length,
            noStaffs: resultStaffs.data.length,
            noDoctors: resultDoctors.data.length});
        console.log("asdf", stats.noPatients);
    };
    useEffect(()=>{
       listGet()
    },[])

    return (
        <div style={ {paddingLeft:300}} className="container">
            <div className="row m-5">
                <div className="col-md-6 align-right">
                    <div style = {{ width: 250, height: 250}} className="box box-shadow card text-center">
                        <div>
                        <h1 style={{fontSize:150}}>{stats.noDoctors}</h1>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Registered Doctors<br/></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div style = {{ width: 250, height: 250}} className="box box-shadow card text-center">
                        <div>
                            <h1 style={{fontSize:150}}> {stats.noPatients}</h1>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Registered Patients<br/></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-5">
                <div className="col-md-6">
                    <div style = {{ width: 250, height: 250}} className="box box-shadow card text-center">
                        <div>
                            <h1 style={{fontSize:150}}> {stats.noStaffs}</h1>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Registered Staffs<br/></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;