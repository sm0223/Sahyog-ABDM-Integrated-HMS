import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import patientService from "../../services/patientService";
import login from "../Login";

const CreateVisit = ({user}) => {
  const [patient, setPatient] = useState(null);
  const [healthIdSearchInput, setHealthIdSearchInput] = useState("");
  const [patientList, setPatientList] = useState(null);
  const handleSearchPatient = async (healthId) => {
    console.log(healthIdSearchInput);
    // const response = await patientService.getPatientFromHealthId(healthIdSearchInput)
    // console.log(response);
    const response = "asf"

    setPatient("asdf")
  }
  useEffect(async () => {
    console.log('effect')
    const patients = await patientService.getAllPatientsWithDoctor(user.userId)
    setPatientList(patients)
  }, [])
  const handleView = (patientData) => {
    setPatient(patientData)
  }
  return (
      <div>
        <Form>
          <h1> Visit Details </h1>
          {!patient && <Row>
            <Label for="healthId">Health ID</Label>
            <Col>
              <Input type="text" name="healthId" id="healthId" placeholder="Enter Health ID" onChange={(event) => {
                setHealthIdSearchInput(event.target.value)
              }}/>
            </Col>
            <Col>
              <Button color="primary" outline onClick={handleSearchPatient}> Search </Button>
            </Col>
          </Row>
          }
          {(patient==null && patientList != null) && <Row>
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
          {patient? <Row>
            <Col>
              <div className="container">
                <Form>
                  <FormGroup>
                    <Label for="healthId">Health ID</Label>
                  </FormGroup>
                  <FormGroup>
                    <Label for="healthNumber">Health ID Number</Label>
                    <Input type="text" name="healthNumber" id="healthNumber" placeholder="Enter Health ID Number" value={patient.healthNumber} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Enter Name" value={patient.name} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="gender" id="gender" value={patient.gender}>
                      <option value="">Select Gender</option>
                      <option id="M" value="M">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="birthDate">Birth Date</Label>
                    <Input type="date" name="birthDate" id="birthDate" placeholder="Enter Birth Date"  value={patient.dayOfBirth+"-"+patient.monthOfBirth+"-"+patient.yearOfBirth} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="mobileNumber">Mobile Number</Label>
                    <Input type="tel" name="mobileNumber" id="mobileNumber" placeholder="Enter Mobile Number" value={patient.mobile} />
                  </FormGroup>
                </Form>
              </div>

            </Col>
            <Col>
              <FormGroup>
                <Row>
                  <Button color="primary" outline> Assign a Care Context </Button>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Button color="primary" outline> Create a new Care Context </Button>
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

              <FormGroup>
                <Row>
                  <Button color="primary" outline> Attach PDF to this Visit </Button>
                </Row>

              </FormGroup>



            </Col>
          </Row> :null
          }
        </Form>
      </div>
  );
};

export default CreateVisit;
