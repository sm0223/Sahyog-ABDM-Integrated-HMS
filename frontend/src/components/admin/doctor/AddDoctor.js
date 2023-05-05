import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, FormGroup, Label, Input, Button, Col, Row, FormFeedback} from 'reactstrap';
import adminService from "../../../services/adminService";
import { FormSelect } from "react-bootstrap";
// import DatePicker from 'react-datepicker';  
//    import "react-datepicker/dist/react-datepicker.css";  



const AddDoctor = () => {

    let navigate = useNavigate();

    const user = {
        username: "",
        password: "",
        role: "PRACTITIONER"
    }

    const address = {
        line: "",
        district: "",
        state: "",
        pincode: ""
    }

    const [doctor, setDoctor] = useState({
        name: "",
        mobile: "",
        healthId:"",
        healthIdNumber:"",
        registrationNumber:"",
        gender:"",
        yearOfBirth:"",
        monthOfBirth:"",
        dayOfBirth:"",
        address: address,
        user: user
    });

    const {
        name,
        mobile,
        healthId,
        healthIdNumber,
        registrationNumber,
        gender,
        yearOfBirth,
        monthOfBirth,
        dayOfBirth,
        address: {
            line,
            district,
            state,
            pincode
        },
        user: {
            username,
            password,
            role
        }
    } = doctor;
    
    const initialError = {
        healthId:"",
        name: "Name is Required",
        gender: "",
        birthDate: "",
        line: "",
        district: "",
        state: "",
        pincode: "",
        mobile: "",
        healthIdNumber:"",
        username:"",
        password:"",
        registrationNumber:""
}
    
const [formErrors, setFormErrors] = useState(initialError);


const validateForm = (targetName, targetValue) => {
    // console.log(targetName, targetValue)
    if(targetName=== "healthId") {
      if (targetValue === "") {
        setFormErrors({...formErrors, healthId: "HealthId is mandatory"})
      } else if (new RegExp("^[A-Za-z0-9]*@[A-Za-z0-9]*$").test(targetValue)===false) {
        setFormErrors({...formErrors, healthId: "Invalid HealthId"})
      } else {
        setFormErrors({...formErrors, healthId: ""})
      }
    }
    if(targetName=== "name") {
      if (targetValue === "") {
        setFormErrors({...formErrors, name: "Doctor Name is mandatory"})
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
    if(targetName==="username"){
        if (targetValue === "") {
            setFormErrors({...formErrors, username: "User Name is mandatory"})
          } else {
            setFormErrors({...formErrors, username: ""})
          }
    }
    if(targetName==="registrationNumber"){
        if (targetValue == "") {
            setFormErrors({...formErrors,  registrationNumber: "Doctor registration Number is mandatory"})
          } else { 
            setFormErrors({...formErrors,  registrationNumber: ""})
          }
    }
    if(targetName==="password"){
        if(targetValue.length<=4){
            setFormErrors({...formErrors,password:"Password is too short"})
        }
        else {
            setFormErrors({...formErrors,password:""})
        }

    }
  }    


const onInputChange = (e) => {
    
       if(e.target.name.toString()==="birthDate" && e.target.value.length === 10) {
        console.log(e.target.value.substring(0,4))
        setDoctor({
          ...doctor,
          yearOfBirth: e.target.value.substring(0,4),
          monthOfBirth: e.target.value.substring(5,7),
          dayOfBirth : e.target.value.substring(8,10)
        })
        console.log(doctor);
      }

        else if(e.target.name === "username" || e.target.name === "password" || e.target.name === "role") {
            setDoctor({...doctor, user : { 
                    ...doctor.user,
                    [e.target.name]: e.target.value
                }})
        }

        else if(e.target.name === "line" || e.target.name === "district" || e.target.name === "pincode" || e.target.name === "state") {

            setDoctor({...doctor, address : {
                    ...doctor.address,
                    [e.target.name]: e.target.value
                }})
        }

        else {
            setDoctor({...doctor, [e.target.name]: e.target.value});
        }
    validateForm(e.target.name,e.target.value)
        // console.log(doctor);
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        let nerrors = 0;
        Object.values(formErrors).forEach((value) => nerrors += value.length === 0 ? 0 : 1);
        if(nerrors === 0) {
        try{
            console.log(doctor)

            const response=await adminService.addDoctor(doctor)
            alert('doctor registered')
            setDoctor({name: "",
            mobile: "",
            healthId:"",
            healthIdNumber:"",
            registrationNumber:"",
            gender:"",
            yearOfBirth:"",
            monthOfBirth:"",
            dayOfBirth:"",
            address: address,
            user: user});
            setFormErrors({
                healthId:"",
                name: "",
                gender: "",
                birthDate: "",
                line: "",
                district: "",
                state: "",
                pincode: "",
                mobile: "",
                healthIdNumber:"",
                username:"",
                password:"",
                registrationNumber:""
        })
        // navigate("/admin");
        }
        catch(err){
            alert('Server Unavailable!!! Please Try again after Sometime')
        }
    }
    else{
        alert(nerrors+ ' errors found! Please Correct')
    }
        
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Doctor</h2>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <FormGroup>
                            <Label htmlFor="Name" className="form-label">
                                Name
                            </Label>
                            <Input
                                valid={formErrors.name===""}
                                invalid={formErrors.name!==""}

                                type={"text"}
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.name}</FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="mobile" className="form-label">
                                Contact
                            </Label>
                            <Input
                                valid={formErrors.mobile===""}
                                invalid={formErrors.mobile!==""}
                                type={"text"}
                                className="form-control"
                                placeholder="Enter mobile number"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.mobile}</FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="healthId" className="form-label">
                                HealthId
                            </Label>
                            <Input
                                valid = {formErrors.healthId===""} 
                                invalid = {formErrors.healthId!==""}
                                type="text"
                                className="form-control"
                                placeholder="Enter Health-Id"
                                name="healthId"
                                value={healthId}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.healthId}</FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="healthIdNumber" className="form-label">
                                healthIdNumber
                            </Label>
                            <Input
                                valid={formErrors.healthIdNumber===""}
                                invalid={formErrors.healthIdNumber!==""}
                                type="text"
                                className="form-control"
                                placeholder="Enter Health-Number"
                                name="healthIdNumber"
                                value={healthIdNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                             <FormFeedback>{formErrors.healthIdNumber}</FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="Name" className="form-label">
                                Registration Number
                            </Label>
                            <Input
                                valid={formErrors.registrationNumber===""}
                                invalid={formErrors.registrationNumber!==""}
                                type="text"
                                className="form-control"
                                placeholder="Enter Registration-Number"
                                name="registrationNumber"
                                value={registrationNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.registrationNumber}</FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="Gender" className="form-label">
                                Gender
                            </Label>
                            <Input
                                valid = {formErrors.gender===""} 
                                invalid = {formErrors.gender!==""}
                                type="select"
                                className="form-control"
                                placeholder="Enter Gender"
                                name="gender"
                                value={gender}

                                onChange={(e) => onInputChange(e)}
                            >
                            <option id="others" value="others">Others</option>
                            <option id="Male" value="Male">Male</option>
                            <option id= "Female" value="Female">Female</option>
                            </Input>
                            <FormFeedback>{formErrors.gender}</FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="Birthdate" className="form-label">
                                Birthdate
                            </Label>
                            <Input
                                type="date"
                                valid={formErrors.birthDate===""}
                                invalid={formErrors.birthDate!==""}
                                className="form-control"
                                placeholder="Enter Year of Birth"
                                name="birthDate"
                                value = {yearOfBirth? new Date(yearOfBirth+"-"+
                                          monthOfBirth+"-"+
                                          dayOfBirth).toISOString().split('T')[0]:""}
                                onChange={(e) => onInputChange(e)}
                            />
                             <FormFeedback>{formErrors.birthDate}</FormFeedback>
                            </FormGroup>
                        </div>
                    
                        
                        <div className="mb-3">
                        <FormGroup>
                            <Label htmlFor="line" className="form-label">
                                Line
                            </Label>
                            <Input
                                type="textarea"
                                valid = {formErrors.line===""} invalid = {formErrors.line!==""}
                                className="form-control"
                                placeholder="Enter Line"
                                name="line"
                                value={line}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.line}</FormFeedback>
                            </FormGroup></div>
                        <div className="mb-3"><FormGroup>
                            <Label htmlFor="district" className="form-label">
                                District
                            </Label>
                            <Input
                                type="text"
                                valid = {formErrors.district===""} invalid = {formErrors.district!==""}
                                className="form-control"
                                placeholder="Enter District"
                                name="district"
                                value={district}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.district}</FormFeedback>
                            </FormGroup></div>
                        <div className="mb-3"><FormGroup>
                            <Label htmlFor="state" className="form-label">
                                State
                            </Label>
                            <Input
                                type="text"
                                valid = {formErrors.state===""} invalid = {formErrors.state!==""}
                                className="form-control"
                                placeholder="Enter State"
                                name="state"
                                value={state}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.state}</FormFeedback>
                       </FormGroup> </div>
                        <div className="mb-3"><FormGroup>
                            <Label htmlFor="pincode" className="form-label">
                                Pin-code
                            </Label>
                            <Input
                                type="text"
                                valid = {formErrors.pincode===""} invalid = {formErrors.pincode!==""}
                                className="form-control"
                                placeholder="Enter Pincode"
                                name="pincode"
                                value={pincode}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.pincode}</FormFeedback>
                       </FormGroup> </div>
                        <div className="mb-3"><FormGroup>
                            <Label htmlFor="username" className="form-label">
                                UserName
                            </Label>
                            <Input
                            valid={formErrors.username===""}
                            invalid={formErrors.username!==""}
                                type="text"
                                className="form-control"
                                placeholder="Enter UserName"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.username}</FormFeedback>
                        </FormGroup></div>
                        <div className="mb-3"><FormGroup>
                            <Label htmlFor="password" className="form-label">
                                Password
                            </Label>
                            <Input
                                valid={formErrors.password===""}
                                invalid={formErrors.password!==""}
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.password}</FormFeedback>
                            </FormGroup>
                        </div>
                        
                        <center><Button type="submit" className="btn btn-outline-primary">
                            Submit
                        </Button>
                            <Link className="btn btn-outline-danger mx-2" to="/admin">
                                Cancel
                            </Link>
                        </center>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;