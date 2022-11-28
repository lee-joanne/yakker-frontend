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
import PostList from './pages/post/PostList';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();
  const yakfile_id = currentUser?.yakfile_id || ""

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={<PostList message="No results found. Try using other search keywords?" />} />
          <Route exact path="/feed" element={<PostList message="No results found. Try using other search keywords or follow a user." filter={`author__followed_user__author__yakfile=${yakfile_id}&`} />} />
          <Route exact path="/reyakked" element={<PostList message="No results found. Try using other search keywords or like a post." filter={`post_reyakker__post_reyakker__yakfile=${yakfile_id}&ordering=-post_reyakker__created_at&`} />} />
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
