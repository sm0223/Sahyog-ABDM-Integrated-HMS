import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import patientService from "../../services/patientService";
import login from "../Login";

const CreateVisit = ({user}) => {
  const [healthIdSearchInput, setHealthIdSearchInput] = useState("");
  const [patientList, setPatientList] = useState(null);
  const [visit, setVisit] = useState({
    patient: null,
    reasonOfVisit : "",
    diagnosis : "",
    pdf: null
  })
  const [visitCreated, setVisitCreated] = useState(false);
  

  useEffect(async () => {
    console.log('effect')
    const patients = await patientService.getAllPatientsWithDoctor(user.userId)
    setPatientList(patients)
  }, [])

  const handleView = (patientData) => {
    setVisit({
      ...visit,
      patient : patientData
    })  }

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

    // const response = await doctorService.createVisit(visit)
    // if(response.status == 202) 
    setVisitCreated(true)
  }
  const handleReEditVisit = () => {
    setVisitCreated(false)
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

          {(visit.patient==null && patientList != null) && <Row>
            <div className="container">
              <h3 className="my-5">Today's Patients</h3>
              <table className="table table-responsive shadow">
                <thead className="table table-dark shadow ">
                <tr>
                  <th scope="col"><p className="my-2 text-center">Patient Health Id</p></th>
                  <th scope="col"><p className="my-2 text-center">Name </p></th>
                  <th scope="col"><p className="my-2 text-center">Age </p></th>
                  <th scope="col"><p className="my-2 text-center">Gender</p></th>
                  <th scope="col"><p className="my-2 text-center">Reason Of Visit</p></th>
                  <th scope="col"><p className="my-2 text-center">Action</p></th>
                </tr>
                </thead>
                <tbody>
                {
                  patientList.map(patientData =>
                      <tr className="m-2" key={patientData.healthId}>
                        <th> {patientData.healthId}</th>
                        <td> {patientData.name}</td>
                        <td> {patientData.age}</td>
                        <td> {patientData.gender}</td>
                        <td> {patientData.reasonOfVisit}</td>
                        <td >
                          <p><button className="btn btn-success m-2"
                                     id={"view"+patientData.id}
                                     key={"view"+patientData.id}
                                     onClick={()=>handleView(patientData)}>
                            &nbsp;&nbsp;Start Visit&nbsp;&nbsp;</button>
                          </p>
                        </td>
                      </tr>
                  )
                }
                </tbody>
              </table>
            </div>
          </Row>  
          }
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
                            <FormGroup>
                              <Button className='btn btn-primary' type='submit' onClick={handleReEditVisit}>Re-Edit</Button>
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
                  <Button color="primary" outline> Create new Consent Request </Button>
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
              {visitCreated && <>
                <FormGroup>
                  <Row>
                    <Button color="primary" outline> Assign Care-Context</Button>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Row>
                    <Button color="primary" outline> Create new Care-Context </Button>
                  </Row>
                </FormGroup>
              </>
              }
            </div>
          </Row>
          }
      </div>
  );
};

export default CreateVisit;
