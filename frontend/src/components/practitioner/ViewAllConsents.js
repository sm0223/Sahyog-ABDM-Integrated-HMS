import {Button, Modal, ModalHeader, ModalBody,} from 'reactstrap';
import doctorService from "../../services/doctorService";

const ViewAllConsents = ({modal, consentList, handleDashboard})=> {

  console.log("consentList", consentList)
  const toggle = () => handleDashboard("CLOSE-VIEW-CONSENT");

  const checkStatus = (consent) => {
    const response = doctorService.getConsentStatus("")
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
                          <Button onClick={()=>checkStatus(consent)}>Fetch Status</Button>
                        </td>

                      </tr>
                  ))}
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
        {/*{viewconsentState.state&&<View modal={viewconsentState.state}*/}
        {/*                                              patient = {patient}*/}
        {/*                                              consent={viewconsentState.consent}*/}
        {/*                                              setViewconsent = {setViewconsentState}/> }*/}
      </div>
  );
}
export default ViewAllConsents;
