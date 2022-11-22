import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/yakker-logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return (
        <Navbar bg="white" expand="md" fixed="top" className={styles.NavBar}>
            <Container>
                <Navbar.Brand><img src={logo} alt="yakker logo" height="50" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link href="#home"><i class="fa-solid fa-house"></i> Home</Nav.Link>
                        <Nav.Link href="#link1"><i class="fa-solid fa-user-plus"></i> Sign up</Nav.Link>
                        <Nav.Link href="#link"><i class="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar