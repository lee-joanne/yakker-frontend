// Code for NavBar navigation, expanding NavBar toggle event listener, and conditional
// rendering taken from CI's Moments project.
import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/yakker-logo.png";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import styles from "../styles/NavBar.module.css";
import { removeTokenTimestamp } from "../utils/utils";

import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const { expanded, ref, setExpanded } = useClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavText
        }
        to="/feed"
      >
        <i className="fa-solid fa-rss" /> Feed
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavText
        }
        to="/post/create"
      >
        <i className="fa-solid fa-square-plus" /> Create post
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavText
        }
        to="/reyakked"
      >
        <i className="fa-solid fa-heart" /> Reyakked
      </NavLink>
      <NavLink className={styles.NavText} onClick={handleLogOut} to="/">
        <i className="fa-solid fa-right-to-bracket" /> Log out
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavText
        }
        to="/signup"
      >
        <i className="fa-solid fa-user-plus" /> Sign Up
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavText
        }
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket" /> Login
      </NavLink>
    </>
  );
  const yakfileUser = (
    <NavLink
      className={styles.NavLink}
      to={`/yakfile/${currentUser?.yakfile_id}`}
    >
      <Navbar.Brand>
        <Avatar
          height={35}
          src={currentUser && currentUser.yakfile_image}
          yakfile={currentUser && currentUser.username}
        />
      </Navbar.Brand>
    </NavLink>
  );

  return (
    <Navbar
      bg="white"
      className={styles.NavBar}
      expand="lg"
      expanded={expanded}
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img alt="yakker logo" height="50" src={logo} />
          </Navbar.Brand>
        </NavLink>
        {currentUser && yakfileUser}
        <Navbar.Toggle
          ref={ref}
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
              }
              to="/"
            >
              <i className="fa-solid fa-house" /> Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavText
              }
              to="/about"
            >
              <i className="fa-solid fa-circle-question" /> About
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
