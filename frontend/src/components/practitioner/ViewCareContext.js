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
import {Link} from "react-router-dom";

const ViewCareContext = ({modal, patient, careContext, setViewCareContext})=> {
  // console.log(careContext)
  const [blobObject, setBlobObject] = useState(null);
  const toggle = () => setViewCareContext({
    state:false,
  });
  useEffect(() => {
    return () => {

    };
  }, []);


  return (
      <div className="container" style={{marginTop:50}}>
        <Modal style={{marginTop  :60}} fade={true} centered={true} size={"lg"} scrollable={true} isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Care Details</ModalHeader>
          <ModalBody>
            <div className="border rounded p-4 mt-2 shadow">
              <div className="card">
                <div className="card-header">
                  <h5>Patient Details:</h5>
                  <Row>
                    <Col>
                      <p><b>Name : </b>{patient.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p><b>Gender : </b>{patient.gender}</p>
                    </Col>
                    <Col>
                      <p><b>Age : </b>{new Date().getFullYear()-patient.yearOfBirth}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p><b>Health Id : </b>{patient.healthId}</p>
                    </Col>
                    <Col>
                      <p><b>Contact : </b> {patient.mobile}</p>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <h5>Visits: </h5>
                  {careContext&& careContext.visitList.map((visit, index) => (
                      <Container id={index} name ={index}>
                        <Row>
                          <Col>
                            <p><b>Date of Visit : </b> {visit.dateOfVisit}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <b>Reason of Visit :</b>
                            <p>{visit.reasonOfVisit}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b>Diagnosis :</b>
                            <p>{visit.diagnosis}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b>Detailed Health Record :</b>
                            {visit.healthRecord&&<a href={atob(visit.healthRecord)} download>
                              {patient.healthId + "_hr_cc_" + careContext.careContextId + "_visit_" + index + "." +
                                  atob(visit.healthRecord).split(',')[0].split(':')[1].split(';')[0].split('/')[1]
                              }</a>}
                          </Col>
                        </Row>
                        <hr/>
                      </Container>
                    ))
                  }
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
  );
}

export default ViewCareContext;