import React from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";

const CreateAppointment = ({user, patient}) => {

  return (
      <div>
        <Form>
          <h1> Appointment Details </h1>
          <FormGroup>
            <Label for="healthId">Health ID</Label>
            <Input type="text" name="healthId" id="healthId" placeholder="Enter Health ID" value={patient.healthId} />
          </FormGroup>
          <FormGroup>
            <Label for="healthId">Reason of Visit</Label>
            <Input type="text" name="reasonOfVisit" id="reasonOfVisit" placeholder="Enter Reason of Visit" />
          </FormGroup>
          <FormGroup>
            <Label for="healthId"></Label>
            <Input type="text" name="reasonOfVisit" id="reasonOfVisit" placeholder="Enter Reason of Visit" />
          </FormGroup>
          <FormGroup>
            <Label for="healthId"></Label>
            <Input type="date" name="dateOfVisit" id="dateOfVisit" value={new Date().toString()} />
          </FormGroup>

        </Form>
      </div>
  );
};

export default CreateAppointment;
