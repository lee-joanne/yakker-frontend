import React from 'react';
import styles from "../../styles/LoginSignUp.module.css";
import logoImage from '../../assets/yakker-logo-image.png';
import btnStyles from "../../styles/Button.module.css";
import { Form, Button, Image, Row, Container, Col } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Container className="bg-white col-md-8">
            <Row className="p-4 mt-5 justify-content-md-center">
                <Col className="text-center">
                    <Image
                        className={styles.LogoImage}
                        src={logoImage}
                    />
                    <h1 className="mb-3">Sign Up!</h1>
                    <Row className="justify-content-center">
                        <Form>
                            <Form.Group controlId="username" className="text-left mb-2">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" name="username" />
                            </Form.Group>
                            <Form.Group controlId="password" className="text-left mb-2">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" />
                            </Form.Group>
                            <Form.Group controlId="password2" className="text-left">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" name="password2" />
                            </Form.Group>
                            <br />
                            <Button className={btnStyles.btn} variant="primary" type="submit">
                                Sign me up
                            </Button>
                        </Form>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <p>Already have an account? <span>Login</span> instead!</p>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default SignUpForm