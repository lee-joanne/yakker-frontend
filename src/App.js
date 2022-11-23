import React from 'react';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm"
import Footer from './footer';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signin" render={() => <h1>Login</h1>} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route render={() => <h1>Sorry! Not found.</h1>} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
