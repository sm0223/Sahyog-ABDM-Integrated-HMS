import React, {useEffect, useState} from 'react';
import {Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import adminService from "../../services/adminService";
import doctorService from "../../services/doctorService";

const CreateAppointment = ({user, patient}) => {
  const [formErrors, setFormErrors] = useState({
    appointmentDate:"",
    doctor:""
});
  const [doctorList, setDoctorList] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("Date Cannot be Empty");
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    return () => {
      // getDoctors()
    };
  }, []);

  const getDoctors = async () => {
    const response = await adminService.getalldoctor();
    setDoctorList(response.data)
    console.log(response);
  }
  const validateForm = (targetName, targetValue) => {
    // console.log(targetName, targetValue)
    if (targetName === "doctor")  {
      if (targetValue == "") {
        setFormErrors({...formErrors, doctor: "HealthId is mandatory"})
      }else {
        setFormErrors({...formErrors, doctor: ""})
      }
    }
    if (targetName === "appointmentDate") {
      if (new Date(targetValue) < new Date(new Date().toISOString().split('T')[0]) ) {
        setFormErrors({...formErrors, appointmentDate: "Date cannot be in Past"})
      } else {
        setFormErrors({...formErrors, appointmentDate: ""})
      }
    }
  }
  const handleChange = (event) => {
    event.preventDefault();
    if(event.target.name === "doctor"){
      setDoctor(event.target.value);
    }
    else if (event.target.name === "doctor"){
      setDoctor(event.target.value);
    }
    validateForm(event.target.name, event.target.value)
  };
  if(doctorList===null) {
    return;
  }
  const handleSubmitAppointment = async () => {
    const response = await doctorService.createNewAppointment(patient.healthId, doctor.healthId, appointmentDate)
    console.log("response in appointment creattion",response)
  };
  return (
      <div className="container border" style={{width:"50%", marginTop:20}}>
        <h1> Appointment Details </h1>
        <div className="container-fluid border" style={{marginTop: 20}}>
          <Form onSubmit= {handleSubmitAppointment}>
            <FormGroup>
              <Label for="healthId">Health ID : {patient.healthId}</Label>
            </FormGroup>
            <FormGroup>
              <Label for="doctor">Select Doctor</Label>
              <Input valid = {formErrors.doctor===""} invalid = {formErrors.doctor!==""}  type="select" name="doctor" id="doctor"
                     onChange={handleChange}>
                {doctorList.map((doctor, index) => (
                    <option key={index} id={doctor.healthId} value={doctor.healthId}>Dr. {doctor.name}</option>))}
              </Input>
              <FormFeedback>{formErrors.doctor}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label><b>Appointment Date</b></Label>
              <Input valid = {formErrors.appointmentDate===""} invalid = {formErrors.appointmentDate!==""}  name = "appointmentDate" type="Date" id="appointmentDate"
                     onChange={handleChange}></Input>
              <FormFeedback>{formErrors.appointmentDate}</FormFeedback>
            </FormGroup>
            <FormGroup>
            <Input type="submit"></Input>
            </FormGroup>
          </Form>
        </div>
        <br/>
      </div>
  );
};

export default CreateAppointment;
