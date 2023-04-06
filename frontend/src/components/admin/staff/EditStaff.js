
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import adminService from "../../../services/adminService";


const EditStaff = () => {
    let navigate = useNavigate();

    const { id } = useParams();
    const users = {
        username: "",
        password: "",
        userType: ""
    }

    const address = {
        line: "",
        district: "",
        state: "",
        pincode: ""
    }

    const [staff, setStaff] = useState({
        name: "",
        mobile: "",
        healthId:"",
        healthIdNumber:"",
        // registrationNumber:"",
        gender:"",
        yearOfBirth:"",
        monthOfBirth:"",
        dayOfBirth:"",
        address: address,
        users: users
    });

    const {
        name,
        mobile,
        healthId,
        healthIdNumber,
        // registrationNumber,
        gender,
        yearOfBirth,
        monthOfBirth,
        dayOfBirth,
        address: {
            line,
            district,
            state,
            pincode
        },
        users: {
            username,
            password,
            userType
        }

    } = staff;

    const onInputChange = (e) => {
        console.log(e.target.name );
        console.log(e.target.value);

        if(e.target.name === "username" || e.target.name === "password" || e.target.name === "userType") {
            setStaff({...staff, users : {
                    ...staff.users,
                    [e.target.name]: e.target.value
                }})
        }

        else if(e.target.name === "line" || e.target.name === "district" || e.target.name === "pincode" || e.target.name === "state") {

            setStaff({...staff, address : {
                    ...staff.address,
                    [e.target.name]: e.target.value
                }})
        }

        else {
            setStaff({...staff, [e.target.name]: e.target.value});
        }
        console.log(staff);
    };
    useEffect(() => {
        loadUser();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();
        // await axios.put("http://localhost:9191/api/admin/updateStaff", staff);
        await adminService.updateStaff(staff);
        navigate("/");
    };

    const loadUser = async () => {
        // const result = await axios.get(`http://localhost:9191/api/admin/getStaff/${id}`);
        const result= await adminService.getStaff(id);
        setStaff(result.data);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit staff details</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Contact
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter number"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                healthId
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Health-Id"
                                name="healthId"
                                value={healthId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                healthIdNumber
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Health-Number"
                                name="healthIdNumber"
                                value={healthIdNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="Name" className="form-label">*/}
                        {/*        Registration Number*/}
                        {/*    </label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        className="form-control"*/}
                        {/*        placeholder="Enter Registration-Number"*/}
                        {/*        name="registrationNumber"*/}
                        {/*        value={registrationNumber}*/}
                        {/*        onChange={(e) => onInputChange(e)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Gender
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                year-of-Birth
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Year of Birth"
                                name="yearOfBirth"
                                value={yearOfBirth}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                month-Of-Birth
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter month-Of-Birth"
                                name="monthOfBirth"
                                value={monthOfBirth}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                day-Of-Birth
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter dayOfBirth"
                                name="dayOfBirth"
                                value={dayOfBirth}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Line
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Line"
                                name="line"
                                value={line}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                District
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter District"
                                name="district"
                                value={district}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                State
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter State"
                                name="state"
                                value={state}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Pin-code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Pincode"
                                name="pincode"
                                value={pincode}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                UserName
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter UserName"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                UserType
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter UserType"
                                name="userType"
                                value={userType}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <center><button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                            <Link className="btn btn-outline-danger mx-2" to="/admin">
                                Cancel
                            </Link>
                        </center>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default EditStaff;