import React from 'react';
import './Navbar.css';
import { Brand, Nav, Navbar, Header, Collapse, NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import logo from '../../assets/images/BubblinkLogo.png';


const NavBar = (props) =>

    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
            <img src={logo} alt={"Bubblink"} className="logo"/>
            
                 <a className='LoginLink' href="/login">Login</a>
                <a className='SignUpLink' href="/signup">Sign Up</a>
            
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
        </Navbar.Collapse>
    </Navbar>





export default NavBar;