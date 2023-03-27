import React from 'react';

const StaffDashboard = ({handleDashboard}) => {
  return (
      <div className="container">
        <div className="row m-5">
          <div className="col-md-6">
            <button className="card text-center" onClick={() => handleDashboard("Reg-Emp-Id")}>
              <img src={require("/home/shux/courses/had/Sahyog-ABDM-Integrated-HMS/frontend/src/assets/register.jpg")} className="card-img"/>
              <div className="card-body">
                <h5 className="card-title">Register New Patient<br/></h5>
              </div>
            </button>
          </div>
          <div className="col-md-6">
            <button className="card text-center" onClick={()=>handleDashboard()}>
              <img src={require("/home/shux/courses/had/Sahyog-ABDM-Integrated-HMS/frontend/src/assets/doctor.jpg")} className="card-img"/>
              <div className="card-body">
                <h5 className="text-center">Discharge Patient</h5>
              </div>
            </button>
          </div>
        </div>
      </div>
  );

};

export default StaffDashboard;
