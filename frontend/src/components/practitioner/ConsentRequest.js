import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';

const ConsentRequest = ({modal, handleDashboard,patient})=> {

  const toggle = () => handleDashboard("CLOSE-CONSENT-REQUEST");

  const something = (event)=>{
    event.preventDefault();
    console.log(event)
  }
  if(patient == null) return null;

  return (
      <div>
        <Modal backdrop={"static"} fade={true} centered={true}  isOpen={modal} toggle={toggle}>
          <Form onSubmit={something}>
          <ModalHeader toggle={toggle}>Create Consent Request</ModalHeader>
          <ModalBody>
            <div className="card">
              <div className="card-header">
                <ul className="list-group list-group-flush">
                  <li className="list-inline-item align-middle">
                    <p><b>Name : </b>{patient.healthId}</p>
                  </li>
                  <li>
                      <FormGroup>
                        <Label><b>Purpose</b></Label>
                        <Input type="textarea" id="purpose" ></Input>
                      </FormGroup>
                      <FormGroup>
                        <Label><b>From Date</b></Label>
                        <Input type="Date" id="purpose" ></Input>
                      </FormGroup>
                      <FormGroup>
                        <Label><b>To Date</b></Label>
                        <Input type="Date" id="purpose" ></Input>
                      </FormGroup>
                      <Label><b>Health Record Types</b></Label>
                      <Row>
                        <Col>
                          <FormGroup check>
                            <Input type="checkbox" id= "OPConsultation" name= "OPConsultation"/>
                            <Label check> OP Consultation</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup check>
                          <Input type="checkbox" id= "Prescription" name= "Prescription"/>
                          <Label check> Prescription </Label>
                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup check>
                            <Input type="checkbox" id= "Immunization" name= "Immunization"/>
                            <Label check> Immunization Record</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                  </li>
                </ul>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
  );
}

export default ConsentRequest;