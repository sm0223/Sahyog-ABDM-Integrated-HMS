import React from 'react';

const Sidebar = ({handleDashboard}) => {
    return (<div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280, height: "100vh"}}>
        <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <button onClick={()=>handleDashboard("ADMIN-HOME")} className="nav-link text-white">
                        Home
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("DOCTOR")} className="nav-link text-white">
                        Doctor
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("STAFF")} className="nav-link text-white">
                        Staff
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("PATIENT")} className="nav-link text-white">
                        Staff
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("PATCH")} className="nav-link text-white">
                        Developers
                    </button>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Patients
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Bills & receipts
                    </a>
                </li>
            </ul>
        <hr/>
    </div>
    );
}

export default Sidebar;
