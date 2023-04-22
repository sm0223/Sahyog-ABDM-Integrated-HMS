import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import patientService from "../../services/patientService";
import doctorService from "../../services/doctorService";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import configData from "../../services/apiConfig.json";
const CreateVisit = ({user, visit, setVisit, handleDashboard}) => {
  const visitState = {
    getPatientForm: true,
    visitForm:false,
    careContextForm:false,
    consentRequestForm:false,
  }
  const [patient, setPatient] = useState();
  const [healthIdSearchInput, setHealthIdSearchInput] = useState("");
  const [visitCreated, setVisitCreated] = useState(false);
  const [viewOTP, setViewOTP] = useState(false);
  const [transactionID, setTransactionID] = useState(null)
  const [OTP, setOTP] = useState(null)
  const [accessToken, setAccessToken] = useState(null);
  const handleSearchPatient = async (event) => {
    event.preventDefault()
    const response = await patientService.getPatientFromHealthId(healthIdSearchInput)
    setVisit({
      ...visit,
      patient : response
    })
  }
  const handleSubmitVisit = async(event) => {
    event.preventDefault()
    setVisit({
      ...visit,
      reasonOfVisit : event.target[0].value,
      diagnosis : event.target[1].value
    })
    console.log("event " , event)
    setVisitCreated(true)
  }
  const handleReEditVisit = () => {
    setVisitCreated(false)
  }
  const handleCreateNewCareContext = async () => {
    try {
      await fetchEventSource(configData['url'] + "/api/register/health-id", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"healthId": visit.patient.healthId}),
        onmessage(response) {
          console.log("response ", response.data)
          setTransactionID(JSON.parse(response.data).transactionId)
          setViewOTP(true)
        },
        onclose() {
          console.log("closed")
        },
        onerror(error) {
          throw new Error("Server Un-responsive")
          console.log("error ", error)
        }
      })
    }
    catch (err) {
      console.log(err.toString())
    }
  }
  const handleAssignCareContext = async()=> {
    //todo
    console.log("todo ")
  }
  const handleOTPSubmit = async (event)=> {
    event.preventDefault()
    try {
      await fetchEventSource(configData['url'] + "/api/register/confirmMobileOTP", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"healthId": visit.patient.healthId, "transactionId": transactionID, "mobileOTP": OTP}),

        async onmessage(response) {
          console.log("On confirm response: ", (JSON.parse(response.data)).accessToken)
          setAccessToken((JSON.parse(response.data)).accessToken);
          setViewOTP(false)
          const res = await doctorService.createNewCareContext(accessToken, visit.patient.healthId, visit.patient.name, visit.diagnosis)
          console.log("linkCareContextResponse",res)
          if(res.data = 202) alert('Care Context Saved')
          else alert('unknown error occurred')
        },
        onclose() {
          console.log("closed")
        },
        onerror(error) {
          throw new Error("Server Unresponsive");
          console.log("error ", error)
        }
      })
    }
    catch (err){
      console.log(err.toString())
    }
  }

  return (
      <div>
        <Form onSubmit={handleSearchPatient}>
          <h1> Visit Details </h1>
          {!visit.patient && <Row>
            <Label for="healthId">Health ID</Label>
            <Col>
              <Input type="text" name="healthId" id="healthId" placeholder="Enter Health ID" onChange={(event) => {
                setHealthIdSearchInput(event.target.value)
              }}/>
            </Col>
            <Col>
              <Button type ="submit" color="primary" outline> Search </Button>
            </Col>
          </Row>
          }
        </Form>
        {visit.patient && <Row>
          <div className="col-8 border rounded p-4 mt-2 shadow">
            <h5>Patient Details</h5>
            <div className="card">
              <div className="card-header">
                <ul className="list-group list-group-flush">
                  <li className="list-inline-item align-middle">
                    <p><b>Name : </b>{visit.patient.name}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>Gender : </b>{visit.patient.gender}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>Health Id : </b>{visit.patient.healthId}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>Health Id Number : </b>{visit.patient.healthIdNumber}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>Contact : </b> {visit.patient.mobile}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>Age : </b>{-visit.patient.yearOfBirth + new Date().getFullYear()}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p> <b>Address : </b>{visit.patient.address && visit.patient.address.line}, {visit.patient.address && visit.patient.address.district},  {visit.patient.address && visit.patient.address.state}, {visit.patient.address && visit.patient.address.pincode}</p>
                  </li>
                </ul>
                <br/>
                {visitCreated && <ul className="list-group list-group-flush">
                  <li className="list-inline-item align-middle">
                    <p><b>Reason of Visit : </b>{visit.reasonOfVisit}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>Diagnosis : </b>{visit.diagnosis}</p>
                  </li>
                  <li className="list-inline-item align-middle">
                    <p><b>pdf : </b>{visit.pdf}</p>
                  </li>
                  {viewOTP && <Form onSubmit={handleOTPSubmit}>
                    <FormGroup>
                      <Row>
                      <Label>Enter OTP</Label>
                      <Col>
                      <Input id = "otp" onChange={(event) => setOTP(event.target.value)}/></Col>
                      <Col>
                      <Button type ="submit" onClick={handleOTPSubmit}>Submit OTP</Button></Col>
                      </Row>
                    </FormGroup>
                  </Form>
                  }
                  <FormGroup>
                    <Row>
                    <Col md = "2">
                    <Button color="secondary" type='submit' onClick={handleReEditVisit}>Re-Edit</Button>
                    </Col>
                    <Col md = "5">
                    <Button className="btn btn-block" color = 'primary' type='submit' onClick={handleAssignCareContext}>Assign to Existing Care-Context</Button>
                    </Col>
                    <Col md = "5">
                    <Button color='primary' type='submit' onClick={handleCreateNewCareContext}>Create New Care-context</Button>
                    </Col>
                    </Row>
                  </FormGroup>

                </ul>
                }
                {!visitCreated && <ul className="list-group list-group-flush">
                  <form onSubmit = {handleSubmitVisit}>
                    <FormGroup>
                      <Label><b>Reason of Visit </b></Label>
                      <Input type='textarea' id = "reasonOfVisit" name="reasonOfVisit" ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label><b>Diagnosis</b></Label>
                      <Input type='textarea' id = "diagonsis" name="diagonsis"></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Attach Prescription </Label>
                      <Input type='file' id = "pdf" name="pdf"></Input>
                    </FormGroup>
                    <FormGroup>
                      <Input className='btn btn-primary' type='submit'/>
                    </FormGroup>
                  </form>
                </ul>
                }
              </div>
            </div>
          </div>
          <div className="col-4 border rounded p-4 mt-2 shadow">
            <FormGroup>
              <Row>
                <Button color="primary" outline onClick={()=>handleDashboard("CREATE-CONSENT-REQUEST")}> Create new Consent Request </Button>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Button color="primary" outline> View Consent status </Button>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Button color="primary" outline> View Patient History </Button>
              </Row>
            </FormGroup>
          </div>
        </Row>
        }
      </div>
  );
};

export default CreateVisit;
