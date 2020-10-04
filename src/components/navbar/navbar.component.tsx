import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function NavbarComponent() {
  // Menu without funtionality
  return (
    <Navbar bg="dark justify-content-between" variant="dark" className="menuApp">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
                <Nav.Link><span className="oi oi-menu"/> Browse</Nav.Link>
                <Nav.Link><span className="oi oi-plus"/> Add new questions</Nav.Link>
                <Nav.Link><span className="oi oi-cog"/> Api</Nav.Link>
                <Nav.Link><span className="oi oi-chat"/> Discuss</Nav.Link>
                <Nav.Link><span className="oi oi-account-login"/> Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;