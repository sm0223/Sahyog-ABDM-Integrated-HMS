import React, {useState} from 'react';
import Doctor from "./Doctor";
import AdminHome from "./AdminHome";
import Staff from "./Staff";
import {Button, Col} from "reactstrap"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Sidebar from "./Sidebar";
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
        <div className="row">
            <Sidebar handleDashboard={handleDashboard}/>
            <div className="col" style={{height: '100vh'}}>
                <div className="b-example-divider"></div>
                <div className="row">
                    <div className="col-md-9">
                        <div style={ {height: 1000}}>
                            {adminState.doctor && <Doctor/>}
                            {adminState.staff && <Staff/>}
                            {adminState.adminHome && <AdminHome/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard