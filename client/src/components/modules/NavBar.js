import React, { Component } from "react";
import { Link } from "@reach/router";
import { Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";

// Image assets
import FireBird from "../../public/animals.svg";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect fixed="sticky-top" expand="lg" variant="light">
        <Navbar.Brand as={Link} to="/">
          <img src={FireBird}  alt="Ignite" className="NavBar-logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav className="NavBar-container">
            <Nav.Link className="NavBar-link" as={Link} to="/whoweare">Who We Are</Nav.Link>
            <Nav.Link className="NavBar-link" as={Link} to="/contact">Contact</Nav.Link>
     
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;