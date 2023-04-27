import React, { useState } from 'react';
import {Form, FormGroup, Label, Input, Button, Col, Row, FormFeedback} from 'reactstrap';
import registrationService from "../../services/patientService";
import {useNavigate} from "react-router-dom";
const RegisterPatient = ({patient, handleDashboard, setPatient}) => {
  const navigate = useNavigate();
  const initialError = {
    healthId:"",
    name: "",
    gender: "",
    birthDate: "",
    line: "",
    district: "",
    state: "",
    pincode: "",
    mobile: "",
    healthIdNumber:""
  }
  const [formErrors, setFormErrors] = useState(initialError);
  const handleRegisterPatient = async (event) => {
    event.preventDefault();
    let nerrors = 0;
    Object.values(formErrors).forEach((value) => nerrors += value.length === 0 ? 0 : 1);
    if(nerrors === 0) {
      try {
        const response = await registrationService.registerPatient(patient)
        alert('Patient Registered')
        handleDashboard("REGISTER-PATIENT")
      }
      catch(err) {

        alert('Server Unavailable!!! Please Try again after Sometime')
      }

    }
    else {
      alert(nerrors+ ' errors found! Please Correct')
    }
  }
  const validateForm = (targetName, targetValue) => {
    // console.log(targetName, targetValue)
    if(targetName=== "healthId") {
      if (targetValue == "") {
        setFormErrors({...formErrors, healthId: "HealthId is mandatory"})
      } else if (new RegExp("^[A-Za-z0-9]*@[A-Za-z0-9]*$").test(targetValue)===false) {
        setFormErrors({...formErrors, healthId: "Invalid HealthId"})
      } else {
        setFormErrors({...formErrors, healthId: ""})
      }
    }
    if(targetName=== "name") {
      if (targetValue == "") {
        setFormErrors({...formErrors, name: "Patient Name is mandatory"})
      } else {
        setFormErrors({...formErrors, name: ""})
      }
    }
    if(targetName === "birthDate") {
      if (new Date(targetValue) > new Date())
        setFormErrors({...formErrors, birthDate: "Birth Date cannot be in Future"})
      else
      setFormErrors({...formErrors, birthDate: ""})
    }
    if(targetName=== "mobile") {
      if (new RegExp("^\\d{10}$").test(targetValue)===false) setFormErrors( {...formErrors, mobile: "Invalid Mobile only(10 digits allowed)"})
      else setFormErrors( {...formErrors, mobile: ""})
    }
  }
  const onChangeInputs= (event) => {
    console.log(event.target.value.length)
    if(event.target.name.toString()==="birthDate" && event.target.value.length === 10) {
      setPatient({
        ...patient,
        yearOfBirth: event.target.value.substring(0,4),
        monthOfBirth: event.target.value.substring(5,7),
        dayOfBirth : event.target.value.substring(8,10)
      })
    }
    else if (event.target.name.toString()==="line" || event.target.name.toString()==="district"
          || event.target.name.toString()==="pincode" || event.target.name.toString()==="state") {
      const add = {
        ...patient.address,
        [event.target.name] : event.target.value
      }
      setPatient({
        ...patient,
        address: add
      })
    }
    else {
      setPatient({
        ...patient,
        [event.target.name]: event.target.value
      })
    }
    validateForm(event.target.name, event.target.value)
  }
  if(patient == null) return null;
  return (
    <div className="container shadow-lg" style={{padding:30}}>
      <Form onSubmit={handleRegisterPatient}>
        <h1> Patient Details </h1>
        <FormGroup>
          <Label for="healthId">Health ID</Label>
          <Input valid = {formErrors.healthId===""} invalid = {formErrors.healthId!==""} type="text" name="healthId" id="healthId" placeholder="Enter Health ID" value={patient.healthId} onChange={onChangeInputs}/>
          <FormFeedback>{formErrors.healthId}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="name">Name</Label>
          <Input valid = {formErrors.name===""} invalid = {formErrors.name!==""}  type="text" name="name" id="name" placeholder="Enter Name" value={patient.name} onChange={onChangeInputs} />
          <FormFeedback>{formErrors.name}</FormFeedback>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label for="healthIdNumber">Health ID Number</Label>
              <Input valid = {formErrors.healthIdNumber===""} invalid = {formErrors.healthIdNumber!==""}  type="text" name="healthIdNumber" id="healthIdNumber" placeholder="Enter Health ID Number" value={patient.healthIdNumber} onChange={onChangeInputs} />
            <FormFeedback>{formErrors.healthIdNumber}</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input valid = {formErrors.gender===""} invalid = {formErrors.gender!==""}  type="select" name="gender" id="gender" value={patient.gender} onChange={onChangeInputs}>
                <option id="Male" value="Male">Male</option>
                <option id= "Female" value="Female">Female</option>
              </Input>
            <FormFeedback>{formErrors.gender}</FormFeedback>
        </FormGroup>
        </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>

              <Label for="birthDate">Birth Date</Label>
              <Input valid = {formErrors.birthDate===""} invalid = {formErrors.birthDate!==""}  type="date" name="birthDate" id="birthDate" placeholder="Enter Birth Date"
                     value = {new Date(patient.yearOfBirth+"-"+
                         patient.monthOfBirth+"-"+
                         patient.dayOfBirth).toISOString().split('T')[0]}
                     onChange={onChangeInputs} />
              <FormFeedback>{formErrors.birthDate}</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="mobileNumber">Mobile Number</Label>
              <Input valid = {formErrors.mobile===""} invalid = {formErrors.mobile!==""}  type="text" name="mobile" id="mobile" placeholder="Enter Mobile Number" value={patient.mobile} onChange={onChangeInputs} />
              <FormFeedback>{formErrors.mobile}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="address">Address</Label>
          <div className="container shadow">
            <Row>
              <Col>
                <FormGroup>
                  <Label for="line">Line</Label>
                  <Input valid = {formErrors.line===""} invalid = {formErrors.line!==""}  type="textarea" name="line" id="line" placeholder="Enter Line"
                         value={patient.address.line? patient.address.line : ""}
                         onChange={onChangeInputs} />
                  <FormFeedback>{formErrors.line}</FormFeedback>
        </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="line">District</Label>
                  <Input valid = {formErrors.district===""} invalid = {formErrors.district!==""}  type="text" name="district" id="line" placeholder="Enter District" value={patient.address? patient.address.district : ""} onChange={onChangeInputs} />
                <FormFeedback>{formErrors.district}</FormFeedback>
        </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="line">State</Label>
                  <Input valid = {formErrors.state===""} invalid = {formErrors.state!==""}  type="text" name="state" id="state" placeholder="Enter State" value={patient.address? patient.address.state : ""} onChange={onChangeInputs} />
                <FormFeedback>{formErrors.state}</FormFeedback>
        </FormGroup>
              </Col>
            </Row>
            <Row>
            <FormGroup>
              <Label for="pincode">Pincode</Label>
              <Input valid = {formErrors.pincode===""} invalid = {formErrors.pincode!==""}  type="text" name="pincode" id="pincode" placeholder="Enter Pincode" value={patient.address? patient.address.pincode : ""} onChange={onChangeInputs} />
            <FormFeedback>{formErrors.pincode}</FormFeedback>
        </FormGroup>
            </Row>
          </div>
        </FormGroup>
        <FormGroup>
        <Input className="btn btn-primary" type="submit" onClick={handleRegisterPatient}>Submit</Input>
        <br/>
        </FormGroup>
      </Form>
    </div>
  );
};

export default RegisterPatient;
