import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

import adminService from "../../../services/adminService";



const ViewStaff = () => {

    const [staff, setStaff] = useState({

    });

    const { id } = useParams();

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = async () => {
        const result = await adminService.getStaff(id)
        console.log(result);
        setStaff(result.data);
        console.log(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Staff Details</h2>

                    <div className="card">
                        <div className="card-header">
                            <center> <b>Details of : </b>{staff.name}</center>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Gender:</b>
                                    {staff.gender}
                                </li>
                                <li className="list-group-item">
                                    <b>Health Id:</b>
                                    {staff.healthId}
                                </li>
                                <li className="list-group-item">
                                    <b>Health Id Number:</b>
                                    {staff.healthIdNumber}
                                </li>
                                <li className="list-group-item">
                                    <b>Contact:</b>
                                    {staff.mobile}
                                </li>
                                {/*<li className="list-group-item">*/}
                                {/*    <b>Registration Number:</b>*/}
                                {/*    {staff.registrationNumber}*/}
                                {/*</li>*/}
                                <li className="list-group-item">
                                    <b>DOB:</b>
                                    <p>{staff.dayOfBirth}-{staff.monthOfBirth}-{staff.yearOfBirth}</p>
                                </li>
                                {/* <li className="list-group-item">
                                    <b>Credentials: </b>
                                    <p> {staff.user && staff.user.username} {staff.user && staff.user.password} {staff.user && staff.user.userType}</p>
                                </li> */}
                                <li className="list-group-item">
                                    <b>Address: </b>
                                    <p> {staff.address && staff.address.line}, {staff.address && staff.address.district},  {staff.address && staff.address.state}, {staff.address && staff.address.pincode}</p>
                                </li>
                            </ul>
                        </div>
                        <Link className="btn btn-primary my-2" to={"/admin"}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStaff;