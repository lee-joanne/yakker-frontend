import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/yakker-logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const loggedInIcons = <>
        <NavLink to="/feed" className={({ isActive }) =>
            isActive ? styles.Active : styles.NavText
        }><i class="fa-solid fa-globe"></i> Feed</NavLink>
        <NavLink to="/post/create" className={({ isActive }) =>
            isActive ? styles.Active : styles.NavText
        }><i class="fa-solid fa-square-plus"></i> Create post</NavLink>
        <NavLink to="/reyakked" onClick={() => { }} className={({ isActive }) =>
            isActive ? styles.Active : styles.NavText
        }><i class="fa-solid fa-heart"></i> Reyakked</NavLink>
        <NavLink className={styles.logOutStyle} to="/logout"><i class="fa-solid fa-right-to-bracket"></i> Logout</NavLink>
    </>
    const loggedOutIcons = (
        <>
            <NavLink to="/signup" className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
            }><i class="fa-solid fa-user-plus"></i> Sign Up</NavLink>
            <NavLink to="/login" className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
            }><i class="fa-solid fa-right-to-bracket"></i> Login</NavLink>
        </>
    );
    const yakfileUser = (
        <Navbar.Brand><Avatar src={currentUser?.yakfile_image} yakfile={currentUser?.username} height={35} /></Navbar.Brand>
    )

    return (
        <Navbar bg="white" expand="lg" fixed="top" className={styles.NavBar}>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt="yakker logo" height="50" /></Navbar.Brand>
                </NavLink>
                {currentUser && yakfileUser}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? styles.Active : styles.NavText
                        }><i class="fa-solid fa-house"></i> Home</NavLink>
                    </Nav>
                    {currentUser ? loggedInIcons : loggedOutIcons}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar