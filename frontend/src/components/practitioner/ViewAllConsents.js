import {Button, Modal, ModalHeader, ModalBody,} from 'reactstrap';

import React, {useState} from "react";
import DataTransferForm from "./DataTransferForm";

const ViewAllConsents = ({modal, consentList, handleDashboard})=> {
  const [dataTransferForm, setDataTransferForm] = useState({
    state:false,
    consent:null
  });
  console.log("consentList", consentList)
  const toggle = () => handleDashboard("CLOSE-VIEW-CONSENT");

  const handleDataTransferForm = (consent) => {
    setDataTransferForm({
      state:true,
      consent: consent
    })
  };
  return (
      <div className="container" style={{marginTop:50}}>
        <Modal style={{marginTop  :60}}
               backdrop={"static"} fade={false} size={"xl"} isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Consent Requests</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="py-4">
                <table className="table border shadow">
                  <thead>
                  <tr>
                    <th scope="col">Sl. No</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">From Date</th>
                    <th scope="col">To Date</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {consentList&&consentList.map((consent, index) => (
                      <tr  key={index} >
                        <th scope="row">
                          {index+1}
                        </th>
                        <td>{consent.purposeText}</td>
                        <td>{consent.fromDate.split('T')[0]}</td>
                        <td>{consent.toDate.split('T')[0]}</td>
                        <td>{consent.eraseDate.split('T')[0]}</td>
                        <td>{consent.status}</td>
                        <td>
                          {/*{consent.status === "REQUESTED" && <Button onClick={()=>checkStatus(consent)}>Fetch Status</Button>}*/}
                          {consent.status === "GRANTED" && <Button onClick={()=>handleDataTransferForm(consent)}>Request Data Transfer</Button>}
                        </td>

                      </tr>
                  ))}
                  {consentList.length ==0 && <tr><td></td> <td></td> <td></td><td>No Active Consents to show</td><td></td><td></td><td></td></tr>}
                  </tbody>
                  <tfoot>
                  <tr>
                    <td>
                    </td>
                  </tr>
                  </tfoot>

                </table>

              </div>
            </div>
          </ModalBody>
        </Modal>

        {dataTransferForm.state&&<DataTransferForm modal={dataTransferForm.state}
                                                      consent = {dataTransferForm.consent}
                                                      setDataTransferForm= {setDataTransferForm}/> }
      </div>
  );
}
export default ViewAllConsents;
