import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import registrationService from "../../services/patientService";
import {useNavigate} from "react-router-dom";

const RegisterPatient = ({patient, handleDashboard, setPatient}) => {
  const navigate = useNavigate();
  const handleRegisterPatient = async (event) => {
    event.preventDefault();
    console.log(patient)
    // const response = await registrationService.registerPatient(patient)
    // alert('Patient Registered')
    // handleDashboard("REGISTER-PATIENT")
  }
  const onChangeInputs= (event) => {
    // console.log(event);

    setPatient({
      ...patient,
      [event.target.name]: event.target.value
    })
    // console.log(patient)
  }
  if(patient == null) return "";
  return (
    <div className="container">
      <Form onSubmit={handleRegisterPatient}>
        <h1> Patient Details </h1>
        <FormGroup>
          <Label for="healthId">Health ID</Label>
          <Input type="text" name="healthId" id="healthId" placeholder="Enter Health ID" value={patient.healthId} onChange={onChangeInputs}/>
        </FormGroup>
        <FormGroup>
          <Label for="healthIdNumber">Health ID Number</Label>
          <Input type="text" name="healthIdNumber" id="healthIdNumber" placeholder="Enter Health ID Number" value={patient.healthIdNumber} onChange={onChangeInputs} />
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Enter Name" value={patient.name} onChange={onChangeInputs} />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input type="select" name="gender" id="gender" value={patient.gender} onChange={onChangeInputs}>
            <option value="">Select Gender</option>
            <option id="Male" value="Male">Male</option>
            <option value="Female">Female</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <div className="container">
            <FormGroup>
              <Label for="line">Line</Label>
              <Input type="textarea" name="line" id="line" placeholder="Enter Line" value={patient.address? patient.address.line : null} onChange={onChangeInputs} />
            </FormGroup>

            <FormGroup>
              <Label for="line">District</Label>
              <Input type="textarea" name="district" id="district" placeholder="Enter District" value={patient.address? patient.address.district : null} onChange={onChangeInputs} />
            </FormGroup>

            <FormGroup>
              <Label for="line">State</Label>
              <Input type="textarea" name="state" id="state" placeholder="Enter State" value={patient.address? patient.address.state : null} onChange={onChangeInputs} />
            </FormGroup>

            <FormGroup>
              <Label for="line">Line</Label>
              <Input type="textarea" name="pincode" id="pincode" placeholder="Enter Pincode" value={patient.address? patient.address.pincode : null} onChange={onChangeInputs} />
            </FormGroup>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <Input type="date" name="birthDate" id="birthDate" placeholder="Enter Birth Date"  value={patient.yearOfBirth+"-"+patient.monthOfBirth+"-"+patient.dayOfBirth} onChange={onChangeInputs} />
        </FormGroup>
        <FormGroup>
          <Label for="mobileNumber">Mobile Number</Label>
          <Input type="tel" name="mobileNumber" id="mobileNumber" placeholder="Enter Mobile Number" value={patient.mobile} onChange={onChangeInputs} />
        </FormGroup>
        <Button color="primary" type="submit" onClick={handleRegisterPatient}>Submit</Button>
      </Form>
    </div>
  );
};

export default RegisterPatient;
