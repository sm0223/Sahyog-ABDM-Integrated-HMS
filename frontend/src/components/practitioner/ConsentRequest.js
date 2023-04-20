import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import doctorService from "../../services/doctorService";

const ConsentRequest = ({modal, handleDashboard,patient, user})=> {
  const [purposeText, setPurposeText] = useState("Consent Required");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [eraseDate, setEraseDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear()+1)));
  const [hiTypes, setHiTypes] = useState([
    "OPConsultation",
    "Prescription",
    "DiagnosticReport",
    "DischargeSummary",
    "ImmunizationRecord",
    "HealthDocumentRecord",
    "WellnessRecord"
  ]);
  const toggle = () => handleDashboard("CLOSE-CONSENT-REQUEST");
  const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log(purposeText, hiTypes, fromDate.toISOString())
    const consent  = {
      purpose: {
        text: purposeText,
        code: "CAREMGT",
        refUri: ""
      },
      patient: {
        id: patient?.healthId
      },
      hiu: {
        id: "sahyog-hip-facility-iiitb"
      },
      requester: {
        name: "Dr. Manju",
        identifier: {
          type: "REGNO",
          value: "MH1001",
          system: "https://www.mciindia.org"
        }
      },
      hiTypes: hiTypes,
      permission: {
        accessMode: "VIEW",
        dateRange: {
          from: fromDate.toISOString(),
          to: toDate.toISOString()
        },
        dataEraseAt: eraseDate.toISOString(),
        frequency: {
          unit: "HOUR",
          value: 1,
          repeats: 0
        }
      }
    }
    const res = await doctorService.consentRequestInit(consent);
    console.log(res)
  }
  if(patient == null) return null;

  function updateHiTypes(checked, type) {
    if(checked === true){
      if(hiTypes.find(item=>item === type) === type) ;
      else setHiTypes([...hiTypes,type])
    }
    else{
      setHiTypes(hiTypes.filter(item=> item != type))
    }
  }

  return (
      <div>
        <Modal backdrop={"static"} fade={true} centered={true}  isOpen={modal} toggle={toggle}>
          <Form  onSubmit={handleSubmit}>
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
                      <Input type="textarea" id="purpose" placeholder="Consent Required" onChange={(e)=>setPurposeText(e?.target?.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label><b>From Date</b></Label>
                      <Input type="Date" id="fromDate" name="fromDate"
                             value={fromDate.toISOString().split('T')[0]}
                             onChange={(e)=>setFromDate(new Date(e.target.value))}></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label><b>To Date</b></Label>
                      <Input type="Date" id="purpose"
                             value={toDate.toISOString().split('T')[0]}
                             onChange={(e)=>setToDate(new Date(e.target.value))}></Input>
                    </FormGroup>
                    <Label><b>Health Record Types</b></Label>
                    <>
                      <Row>
                        <Col>
                          <FormGroup check>
                            <Input type="checkbox" id= "OPConsultation" name= "OPConsultation"
                                   checked={hiTypes.find(item=>item==="OPConsultation") === "OPConsultation"}
                                   onChange={(e)=>updateHiTypes(e.target.checked,"OPConsultation")}
                            />
                            <Label check> OP Consultation</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup check>
                          <Input type="checkbox" id= "Prescription" name= "Prescription"
                                 checked={hiTypes.find(item=>item==="Prescription") === "Prescription"}
                                 onChange={(e)=>updateHiTypes(e.target.checked,"Prescription")}
                          />
                          <Label check> Prescription </Label>
                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup check>
                            <Input type="checkbox" id= "ImmunizationRecord" name= "ImmunizationRecord"
                                   checked={hiTypes.find(item=>item==="ImmunizationRecord") === "ImmunizationRecord"}
                                   onChange={(e)=>updateHiTypes(e.target.checked,"ImmunizationRecord")}
                            />
                            <Label check> Immunization Record</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup check>
                              <Input type="checkbox" id= "DischargeSummary" name= "DischargeSummary"
                                     checked={hiTypes.find(item=>item==="DischargeSummary") === "DischargeSummary"}
                                     onChange={(e)=>updateHiTypes(e.target.checked,"DischargeSummary")}
                              />
                            <Label check> Discharge Summary</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup check>
                            <Input type="checkbox" id= "HealthDocumentRecord" name= "HealthDocumentRecord"
                                   checked={hiTypes.find(item=>item==="HealthDocumentRecord") === "HealthDocumentRecord"}
                                   onChange={(e)=>updateHiTypes(e.target.checked,"HealthDocumentRecord")}
                            />
                            <Label check> Health Document</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup check>
                            <Input type="checkbox" id= "DiagnosticReport" name= "DiagnosticReport"
                                   checked={hiTypes.find(item=>item==="DiagnosticReport") === "DiagnosticReport"}
                                   onChange={(e)=>updateHiTypes(e.target.checked,"DiagnosticReport")}
                            />
                            <Label check> Diagnostic Report</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
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