// Code for NavBar navigation, expanding NavBar toggle event listener, and conditional
// rendering taken from CI's Moments project.
import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/yakker-logo.png';
import styles from '../styles/NavBar.module.css';
import { useNavigate, NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from "axios";
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const navigate = useNavigate();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleLogOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInIcons =
        <>
            <NavLink to="/feed" className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
            }><i class="fa-solid fa-rss"></i> Feed</NavLink>
            <NavLink to="/post/create" className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
            }><i class="fa-solid fa-square-plus"></i> Create post</NavLink>
            <NavLink to="/reyakked" className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
            }><i class="fa-solid fa-heart"></i> Reyakked</NavLink>
            <NavLink className={styles.NavText} onClick={handleLogOut}><i class="fa-solid fa-right-to-bracket"></i> Log out</NavLink>
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
        <Navbar.Brand><Avatar src={currentUser && currentUser.yakfile_image} yakfile={currentUser && currentUser.username} height={35} /></Navbar.Brand>
    )

    return (
        <Navbar expanded={expanded} bg="white" expand="lg" fixed="top" className={styles.NavBar}>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt="yakker logo" height="50" /></Navbar.Brand>
                </NavLink>
                {currentUser && yakfileUser}
                <Navbar.Toggle onClick={() => setExpanded(!expanded)} ref={ref} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? styles.Active : styles.NavText
                        }><i class="fa-solid fa-house"></i> Home</NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar