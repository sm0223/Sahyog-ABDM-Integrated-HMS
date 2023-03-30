import React, {useState} from 'react';
import Doctor from "./Doctor";
import AdminHome from "./AdminHome";
import Staff from "./Staff";
import { Button } from "reactstrap"

function AdminDashboard({user}) {
    const falseState = {
        adminHome: false,
        doctor: false,
        staff: false
    }

    const [adminState,setAdminState] = useState({
        adminHome: true,
        doctor: false,
        staff: false
    })
    const handleDashboard = (action)=> {
        console.log(action)
        switch(action) {

            case "ADMIN-HOME":
                setAdminState({
                    ...falseState,
                    adminHome: true
                })
                break;

            case "DOCTOR":
                setAdminState({
                    ...falseState,
                    doctor: true
                })
                break;

            case "STAFF":
                setAdminState({
                    ...falseState,
                    staff: true
                })
                break;
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-3">
                    <div style={{height: 1000}}>
                        <div className="row">
                            <Button color="warning" onClick={()=>handleDashboard("ADMIN-HOME")}>HOME</Button>
                        </div>
                        <div className="row">
                            <Button color="primary" onClick={()=>handleDashboard("DOCTOR")}>DOCTOR</Button>
                        </div>
                        <div className="row">
                            <Button color="secondary" onClick={()=>handleDashboard("STAFF")}>STAFF</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div style={ {height: 1000}}>
                        {adminState.doctor && <Doctor/>}
                        {adminState.staff && <Staff/>}
                        {adminState.adminHome && <AdminHome/>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard