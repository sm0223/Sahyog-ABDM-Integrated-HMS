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


const App = () => {
    const navigate  = useNavigate();
    const [user, setuser] = useState(null);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log('effect',userData)
        setuser(userData)
      }, [])

    const [loginPageData, setLoginPageData] = useState("")

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event);
        const username = event.target[0].value;
        const password = event.target[1].value;
        const stayLoggedIn = event.target[2].checked;

        authService.login(username, password).then((user) => {
            if(user) {
                console.log(user)
                setuser(user)
                setLoginPageData(null)
                if (stayLoggedIn) window.localStorage.setItem("user", JSON.stringify(user))
            }
            else {
                setLoginPageData("Invalid Credentials")
            }
        });
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
                    <Route path="/" element={user ? (user.userType == "staff"? <Navigate replace to="/staff" /> :
                                                    (user.userType == "practitioner"? <Navigate replace to="/practitioner" /> :
                                                    (user.userType == "admin"? <Navigate replace to="/admin" /> : <Navigate replace to = "/"/>)))
                                                  : <Login handleLogin={handleLogin} loginPageData= {loginPageData} />} />
                </Routes>
            
            }
        </div>
    )
};

export default App;
