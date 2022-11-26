import React from 'react';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm"
import LoginForm from "./pages/auth/LoginForm"
import Footer from './footer';
import PostCreateForm from './pages/post/PostCreateForm';
import Page404 from './components/Page404';
import DetailPostPage from './pages/post/DetailPostPage';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/post/create" element={<PostCreateForm />} />
          <Route exact path="post/:id" element={<DetailPostPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
