import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const PatientDetails = ({patient, handleStaffDashboard, handleRegisterPatient}) => {

  if(patient == null) return "";

  console.log(patient)
  return (
      <div className="container">
        <Form >
          <h1> Patient Details </h1>
          <FormGroup>
            <Label for="healthId">Health ID</Label>
            <Input type="text" name="healthId" id="healthId" placeholder="Enter Health ID" value={patient.patient.id} />
          </FormGroup>
          <FormGroup>
            <Label for="healthIdNumber">Health ID Number</Label>
            <Input type="text" name="healthIdNumber" id="healthIdNumber" placeholder="Enter Health ID Number" value={patient.patient.identifiers[1].value} />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Enter Name" value={patient.patient.name} />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input type="select" name="gender" id="gender" value={patient.patient.gender}>
              <option value="">Select Gender</option>
              <option id="M" value="M">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="textarea" name="address" id="address" placeholder="Enter Address" value={patient.patient.address.district + patient.patient.address.state} />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate">Birth Date</Label>
            <Input type="date" name="birthDate" id="birthDate" placeholder="Enter Birth Date"  value={patient.birthDate} />
          </FormGroup>
          <FormGroup>
            <Label for="mobileNumber">Mobile Number</Label>
            <Input type="tel" name="mobileNumber" id="mobileNumber" placeholder="Enter Mobile Number" value={patient.patient.identifiers[0].value} />
          </FormGroup>
          <Button color="primary" type="submit" onClick={handleRegisterPatient}>Submit</Button>
        </Form>
      </div>
  );
};

export default PatientDetails;
