import React from "react";
import {useNavigate} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
function BasicNavbar({user, handleLogout}) {
  const navigate = useNavigate()

  return (
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/"><b>Sahyog Hospitals</b></Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/">Home</Nav.Link>
            { user ?
              <Container>
                <NavDropdown title={user.userType} id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1" onClick={handleLogout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Container> : <Nav.Link href="/">Login</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
  );
}

export default BasicNavbar;