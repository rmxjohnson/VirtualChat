import React from 'react';
import './Navbar.css';
import { Brand, Nav, Navbar, Header, Collapse, NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';


const NavBar = (props) =>

    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
                <a href="/">Go Home</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
            <NavItem eventKey={3} href="/">
                Go Home
     </NavItem>
            <Nav>
                <NavItem eventKey={1} href="/signup">
                    Sign UP
     </NavItem>
                <NavItem eventKey={2} href="/login">
                    Log In
     </NavItem>


            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    Link Right
     </NavItem>
                <NavItem eventKey={2} href="#">
                    Link Right
     </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>;





export default NavBar;