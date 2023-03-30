import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

import adminService from "../../../services/adminService";



const ViewDoctor = () => {

    const [doctor, setDoctor] = useState({

    });

    const { id } = useParams();

    useEffect(() => {
        loadDoctor();
    }, []);

    const loadDoctor = async () => {
        const result = await adminService.getDoctor(id)
        console.log(result);
        setDoctor(result.data);
        console.log(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Doctor Details</h2>

                    <div className="card">
                        <div className="card-header">
                            <center> <b>Details of : </b>{doctor.name}</center>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Gender:</b>
                                    {doctor.gender}
                                </li>
                                <li className="list-group-item">
                                    <b>Health Id:</b>
                                    {doctor.healthId}
                                </li>
                                <li className="list-group-item">
                                    <b>Health Id Number:</b>
                                    {doctor.healthIdNumber}
                                </li>
                                <li className="list-group-item">
                                    <b>Contact:</b>
                                    {doctor.mobile}
                                </li>
                                <li className="list-group-item">
                                    <b>Registration Number:</b>
                                    {doctor.registrationNumber}
                                </li>
                                <li className="list-group-item">
                                    <b>DOB:</b>
                                    <p>{doctor.dayOfBirth}-{doctor.monthOfBirth}-{doctor.yearOfBirth}</p>
                                </li>
                                <li className="list-group-item">
                                    <b>Credentials: </b>
                                    <p> {doctor.users && doctor.users.username} {doctor.users && doctor.users.password} {doctor.users && doctor.users.userType}</p>
                                </li>
                                <li className="list-group-item">
                                    <b>Address: </b>
                                    <p> {doctor.address && doctor.address.line}, {doctor.address && doctor.address.district},  {doctor.address && doctor.address.state}, {doctor.address && doctor.address.pincode}</p>
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

export default ViewDoctor;