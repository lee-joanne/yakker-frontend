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
                    <h1>Sign Up!</h1>
                    <Row className="mt-5 justify-content-center">
                        <p>Already have an account? <span>Login</span> instead!</p>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default SignUpForm