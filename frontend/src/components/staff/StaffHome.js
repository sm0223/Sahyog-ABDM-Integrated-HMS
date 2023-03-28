import React from 'react';
import {Container, Row} from "react-bootstrap";

const StaffHome = ({handleDashboard}) => {
  return (
      <div className="container">
        <div className="row m-5">
          <div className="col-md-6">
            <button style = {{width: 500, height: 500}} className="card text-center" onClick={() => handleDashboard("GET-PATIENT")}>
              <img src={require("../../assets/register.jpg")} className="card-img"/>
              <div className="card-body">
                <h5 className="card-title">Register New Patient<br/></h5>
              </div>
            </button>
          </div>
          <div className="col-md-6">
            <button style = {{width: 500, height: 500}} className="card text-center" onClick={()=>handleDashboard("DISCHARGE-PATIENT")}>
              <img src={require("../../assets/doctor.jpg")} si className="card-img"/>
              <div className="card-body">
                <h5 className="text-center">Discharge Patient</h5>
              </div>
            </button>
          </div>
        </div>
      </div>
  )
};

export default StaffHome;
