import React from 'react';

const PractitionerHome = ({user, handleDashboard}) => {

    return (
      <div className="container">
        <div className="row m-5">
          <div className="col-md-6">
            <button style = {{width: 250, height: 250}} className="card text-center" onClick={() => handleDashboard("GET-PATIENT")}>
              <img src={require("../../assets/create-care-context.png")} className="card-img"/>
              <div className="card-body">
                <h5 className="card-title">Create a Visit<br/></h5>
              </div>
            </button>
          </div>
          <div className="col-md-6">
            <button style = {{width: 250, height: 250}} className="card text-center" onClick={() => handleDashboard("GET-PATIENT")}>
              <img src={require("../../assets/create-consent.png")} className="card-img"/>
              <div className="card-body">
                <h5 className="card-title">Create Consent<br/></h5>
              </div>
            </button>
          </div>
        </div>
        <div className="row m-5">
          <div className="col-md-6">
            <button style = {{width: 250, height: 250}} className="card text-center" onClick={() => handleDashboard("GET-PATIENT")}>
              <img src={require("../../assets/check-consent-status.png")} className="card-img"/>
              <div className="card-body">
                <h5 className="card-title">Check Consent Status<br/></h5>
              </div>
            </button>
          </div>
          <div className="col-md-6">
            <button style = {{width: 250, height: 250}} className="card text-center" onClick={() => handleDashboard("GET-PATIENT")}>
              <img src={require("../../assets/my-schedule.jpg")} className="card-img"/>
              <div className="card-body">
                <h5 className="card-title">My Schedule<br/></h5>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
};

export default PractitionerHome;
