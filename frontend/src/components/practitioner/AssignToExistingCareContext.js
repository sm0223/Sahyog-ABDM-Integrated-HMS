import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container
} from 'reactstrap';
import doctorService from "../../services/doctorService";
import patientService from "../../services/patientService";

const AssignToExistingCareContext = ({modal, handleDashboard, visit, setVisit, careContextList})=> {
  const toggle = () => handleDashboard("CLOSE-ASSIGN-CARE-CONTEXT");

  const handleAssignCareContext = async (careContext) => {
    try {
      const response = await doctorService.assignCareContext(careContext, visit);
      alert('Assigned succesffuly')
      const pat = await patientService.getPatientFromHealthId(visit.patient.healthId)
      setVisit({
        ...visit,
        patient:pat
      })
      handleDashboard("CLOSE-ASSIGN-CARE-CONTEXT")
    }
    catch (err){alert(err.toString())
      console.log(err)}

  };
  return (
      <div className="container" style={{marginTop:50}}>
        <Modal style={{marginTop  :60}} fade={true} centered={true} size={"lg"} scrollable={true} isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Care Details</ModalHeader>
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
                          <Button color="primary" onClick={()=>handleAssignCareContext(careContext)}>Assign</Button>
                        </td>

                      </tr>
                  ))}
                  {!careContextList&& <p>No Care-Contexts found</p>}
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
      </div>
  );
}

export default AssignToExistingCareContext;