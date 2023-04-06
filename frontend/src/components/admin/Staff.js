import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import adminService from "../../services/adminService";

const Staff = () => {


    const [staffs, setStaffs] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadStaffs();
    }, []);

    const loadStaffs = async () => {
        const result = await adminService.getallstaff()
        // const result = await axios.get("http://localhost:9191/api/admin/getAllStaffs");
        setStaffs(result.data);
        console.log(result.data);
    };
    const deleteStaff = async (id) => {
        // await axios.delete(`http://localhost:9191/api/admin/deleteStaff/${id}`);
        await adminService.deletestaff(id);
        loadStaffs();
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
                    {staffs.map((staff, index) => (
                        <tr  key={index} >
                            <th scope="row">
                                {index+1}
                            </th>
                            <td>{staff.name}</td>
                            <td>{staff.users && staff.users.username}</td>
                            <td>{staff.mobile}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewstaff/${staff.healthIdNumber}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-warning mx-2"
                                    to={`/editstaff/${staff.healthIdNumber}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={()=> {
                                        if(window.confirm(`Are you sure you want to remove ${staff.name} ?` ))
                                        {
                                            deleteStaff(staff.id)
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
                            <Link className="btn btn-outline-primary" to="/addstaff">
                                Add Staff
                            </Link>
                        </td>
                    </tr>
                    </tfoot>

                </table>

            </div>
        </div>
    );
};

export default Staff;