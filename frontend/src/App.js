import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import StaffDashboard from "./components/staff/StaffDashboard";
import PractitionerDashboard from './components/practitioner/PractitionerDashboard';
import { useState, useEffect } from 'react';
import authService from './services/authService';
import AdminDashboard from './components/admin/AdminDashboard';
import UnexpectedError from './components/UnexpectedError';
import BasicNavbar from "./components/BasicNavbar";
import AddDoctor from "./components/admin/doctor/AddDoctor";
import EditDoctor from "./components/admin/doctor/EditDoctor";
import ViewDoctor from "./components/admin/doctor/ViewDoctor";
import ViewStaff from "./components/admin/staff/ViewStaff";
import AddStaff from "./components/admin/staff/AddStaff";
import EditStaff from "./components/admin/staff/EditStaff";



const App = () => {
    const navigate  = useNavigate();
    const [user, setuser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log('effect',userData)
        setuser(userData)
    }, [])

    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event);
        const username = event.target[0].value;
        const password = event.target[1].value;
        const stayLoggedIn = event.target[2].checked;

        authService.login(username, password).then((responseData) => {
            if(responseData) {
                console.log(responseData.token)
                setErrorMessage(null)
                window.localStorage.setItem("token", responseData.token)
                setuser({
                    username: username,
                    userType: responseData.role
                })
                if (stayLoggedIn) {
                    window.localStorage.setItem("user", JSON.stringify({
                        username: username,
                        userType: responseData.role
                    }))
                }
            }
            else {
                setErrorMessage("Invalid Credentials")
            }
        },
        (error)=>{
            if(error.code === 'ERR_NETWORK')
                setErrorMessage("Server Unreachable")
            else
                setErrorMessage("Invalid Credentials")
        });
        console.log("asdf");
    }
    const handleLogout = (event)=> {
        event.preventDefault()
        window.localStorage.removeItem("user")
        setuser(null)
        navigate("/")
    }
    return  (
        <div>
            <BasicNavbar user={user} handleLogout={handleLogout}/>
            {
                <Routes>
                    <Route path="/error" element={ <UnexpectedError/>}/>
                    <Route path="/staff" element={ user?<StaffDashboard user = {user}/> : <Navigate replace to="/" />}/>
                    <Route path="/practitioner" element={ user?<PractitionerDashboard user = {user}/> : <Navigate replace to="/" />}/>
                    <Route path="/admin" element={ user?<AdminDashboard user = {user}/> : <Navigate replace to="/" />}/>
                    <Route path="/" element={user ? (user.userType == "STAFF"? <Navigate replace to="/staff" /> :
                            (user.userType == "PRACTITIONER"? <Navigate replace to="/practitioner" /> :
                                (user.userType == "ADMIN"? <Navigate replace to="/admin" /> : <Navigate replace to = "/"/>)))
                        : <Login handleLogin={handleLogin} errorMessage= {errorMessage} />} />
                    <Route path="/adddoctor" element={<AddDoctor/>} />
                    <Route path="/editdoctor/:id" element={<EditDoctor/>}/>
                    <Route path="/viewdoctor/:id" element={<ViewDoctor/>}/>
                    <Route path="/addstaff" element={<AddStaff/>} />
                    <Route path="/editstaff/:id" element={<EditStaff/>}/>
                    <Route path="/viewstaff/:id" element={<ViewStaff/>}/>

                </Routes>

            }
        </div>
    )
};

export default App;
