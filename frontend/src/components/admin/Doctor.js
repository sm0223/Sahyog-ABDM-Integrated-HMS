import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import adminService from "../../services/adminService";

const Doctor = () => {


    const [doctors, setDoctors] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        const result = await adminService.getalldoctor()
        // const result = await axios.get("http://localhost:9191/api/admin/getAllDoctors");
        setDoctors(result.data);
        console.log(result.data);
    };
    const deleteDoctor = async (id) => {
        // await axios.delete(`http://localhost:9191/api/admin/deleteDoctor/${id}`);
        await adminService.deletedoctor(id);
        loadDoctors();
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">mobile</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {doctors.map((doctor, index) => (
                        <tr  key={index} >
                            <th scope="row">
                                {index+1}
                            </th>
                            <td>{doctor.name}</td>
                            <td>{doctor.user && doctor.user.username}</td>
                            <td>{doctor.mobile}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewdoctor/${doctor.healthIdNumber}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-warning mx-2"
                                    to={`/editdoctor/${doctor.healthIdNumber}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={()=> {
                                        if(window.confirm(`Are you sure you want to remove ${doctor.name} ?` ))
                                        {
                                            deleteDoctor(doctor.id)
                                        };
                                    }}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <Link className="btn btn-outline-primary" to="/adddoctor">
                                Add Doctor
                            </Link>
                        </td>
                    </tr>
                    </tfoot>

                </table>

            </div>
        </div>
    );
};

export default Doctor;