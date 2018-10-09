import React from 'react';
import './Navbar2.css';
import { NavbarBrand, Nav, Navbar, Header, Collapse, NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';


const NavBar2 = (props) =>

    <Navbar className="nav2" inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand className="nav2">
                {/* <a clasaName='GoToChatProfile' href="/chat">Go To Chatrooms</a> */}
                <a className='SignOutProfile' href="/login">Sign Out!!</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>

            <Nav>
                <NavItem eventKey={1} href="/chat">
                    Go To Chatrooms
     </NavItem>
                <NavItem eventKey={2} href="/login">
                    Sign Out
     </NavItem>

            </Nav>

        </Navbar.Collapse>
    </Navbar>;





export default NavBar2;