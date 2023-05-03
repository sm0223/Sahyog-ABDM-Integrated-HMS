import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import doctorService from "../../services/doctorService";
import {Link} from "react-router-dom";
import ViewCareContext from "./ViewCareContext";

const ViewPatientHistory = ({modal, handleDashboard, patient, user})=> {
  const [careContextList, setCareContextList] = useState(patient.careContextList);
  const [viewCareContextState, setViewCareContextState] = useState({
    state:false,
    careContext:null
  });
  // useEffect(() => {
  //   return () => {
  //     effect
  //   };
  // }, []);

  console.log(patient)
  const toggle = () => handleDashboard("CLOSE-PATIENT-HISTORY");

  if(patient === null) return null;
  const handleViewCareContext = (careContext) => {
    setViewCareContextState({
      state:true,
      careContext: careContext
    })
  };
  // if(careContextList ==null) return nu
  return (
      <div className="container" style={{marginTop:50}}>
        <Modal style={{marginTop  :60}}
            backdrop={"static"} fade={false} fullscreen={true} isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>View Patient History</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="py-4">
                <table className="table border shadow">
                  <thead>
                  <tr>
                    <th scope="col">Sl. No</th>
                    <th scope="col">Brief of Care</th>
                    <th scope="col">Number of Visits</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {careContextList&&careContextList.map((careContext, index) => (
                      <tr  key={index} >
                        <th scope="row">
                          {index+1}
                        </th>
                        <td>{careContext.display}</td>
                        <td>{careContext.visitList?.length}</td>
                        <td>{careContext.doctor?.name}</td>
                        <td>{careContext.visitList?careContext.visitList[0].dateOfVisit:""}</td>
                        <td>
                          <Button onClick={()=>handleViewCareContext(careContext)}>View Details</Button>
                        </td>

                      </tr>
                  ))}
                  {careContextList.length ==0 && <tr><td></td><td></td><td>No Patient History found</td><td></td><td></td><td></td></tr>}

                  </tbody>
                  <tfoot>
                  <tr>
                    <td>
                    </td>
                  </tr>
                  </tfoot>

                </table>

              </div>
            </div>
          </ModalBody>
        </Modal>
        {viewCareContextState.state&&<ViewCareContext modal={viewCareContextState.state}
                                                      patient = {patient}
                                                      careContext={viewCareContextState.careContext}
                                                      setViewCareContext = {setViewCareContextState}/> }
      </div>
  );
}

export default ViewPatientHistory;