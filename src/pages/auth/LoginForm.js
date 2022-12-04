// Login form functionality credit goes to CI's Moments Project
import React, { useState } from 'react';
import styles from "../../styles/LoginSignUp.module.css";
import logoImage from '../../assets/yakker-logo-image.png';
import btnStyles from "../../styles/Button.module.css";
import shadowStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from '../../utils/utils';

const LoginForm = () => {
    const setCurrentUser = useSetCurrentUser();
    useRedirect('loggedIn')

    const [loginData, setloginData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const { username, password } = loginData;

    const navigate = useNavigate();

    const handleChange = (event) => {
        setloginData({
            ...loginData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', loginData)
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            navigate(-1)
        } catch (err) {
            setErrors(err.response?.data)
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    };

    return (
        <Container className={`bg-white col-md-8 ${shadowStyles.Shadow}`}>
            <Row className="p-4 mt-5 justify-content-md-center">
                <Col className="text-center">
                    <Image
                        className={styles.LogoImage}
                        src={logoImage}
                    />
                    <h1 className="mb-3">Login</h1>
                    <Row className="justify-content-center">

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username" className="text-left mb-2">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" name="username" value={username} onChange={handleChange} />
                            </Form.Group>
                            {errors.username?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}

                            <Form.Group controlId="password" className="text-left mb-2">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                            </Form.Group>
                            {errors.password1?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}

                            <br />
                            <Button className={btnStyles.btn} variant="primary" type="submit">
                                Login!
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
                            ))}
                        </Form>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <p>Don't have an account yet? <span><Link className={styles.Link} to="/signup">
                            Sign up
                        </Link></span> instead!</p>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default LoginForm