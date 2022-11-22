import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/yakker-logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="white" expand="md" fixed="top" className={styles.NavBar}>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt="yakker logo" height="50" /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? styles.Active : styles.NavText
                        }><i class="fa-solid fa-house"></i> Home</NavLink>
                        <NavLink to="/signup" className={({ isActive }) =>
                            isActive ? styles.Active : styles.NavText
                        }><i class="fa-solid fa-user-plus"></i> Sign Up</NavLink>
                        <NavLink to="/login" className={({ isActive }) =>
                            isActive ? styles.Active : styles.NavText
                        }><i class="fa-solid fa-right-to-bracket"></i> Login</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar