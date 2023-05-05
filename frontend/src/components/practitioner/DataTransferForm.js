import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container
} from 'reactstrap';
import doctorService from "../../services/doctorService";
import {Link} from "react-router-dom";

const DataTransferForm = ({modal, consent, setDataTransferForm})=> {
  // console.log(careContext)
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const toggle = () => setDataTransferForm({
    state:false,
    consent:null
  });
  console.log(fromDate.toISOString().split('T')[0])
  const handleDataTransfer = async (event) => {
    event.preventDefault();
    const response = await doctorService.sendDataTransferRequest(fromDate, toDate, consent)
    alert('Data Transfer Request Initiated');
    setDataTransferForm({
      state:false,
      consent:null
    })
  };
  return (
      <div className="container" style={{marginTop:50}}>
        <Modal style={{marginTop  :60}} fade={true} centered={true} size={"lg"} scrollable={true} isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Data Transfer Request</ModalHeader>
          <ModalBody>
            <div className="card">
              <div className="card-header">
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
                <Button color="primary" onClick={handleDataTransfer}>Submit</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
  );
}

export default DataTransferForm;