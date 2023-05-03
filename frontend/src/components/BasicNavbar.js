import React from "react";
import {useNavigate} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
function BasicNavbar({user, handleLogout}) {
  const navigate = useNavigate()

  return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/"><h5>Sahyog Hospitals</h5></a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse"
                data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav px-3">
        { user ?
            <li className="nav-item text-nowrap">
            <NavDropdown title={user.username} id="nav-dropdown" style={{marginRight:1}}>
                  <NavDropdown.Item eventKey="4.2">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.1" onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </li>
              : <Nav.Link href="/">Login</Nav.Link>

          }
        </ul>

      </nav>
  );
}
// {
//   // <Navbar bg="dark" variant="dark">
//   //   <Container fluid>
//   //     <Navbar.Brand href="/"><b>Sahyog Hospitals</b></Navbar.Brand>
//   //     <Nav className="justify-content-end">
//   //       <Nav.Link href="/">Home</Nav.Link>
//   //       {user ?
//   //           <Container>
//   //             <NavDropdown title={user.username} id="nav-dropdown">
//   //               <NavDropdown.Item eventKey="4.2">Profile</NavDropdown.Item>
//   //               <NavDropdown.Divider/>
//   //               <NavDropdown.Item eventKey="4.1" onClick={handleLogout}>Logout</NavDropdown.Item>
//   //
//   //             </NavDropdown>
//   //           </Container> : <Nav.Link href="/">Login</Nav.Link>
//   //       }
//   //     </Nav>
//   //   </Container>
//   // </Navbar>
// }
export default BasicNavbar;