// Code for UsernameForm credit goes to CI Moments
import React, { useState, useEffect } from 'react';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css"
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

const UsernameForm = () => {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
        if (currentUser?.yakfile_id?.toString() === id) {
            setUsername(currentUser.username);
        } else {
            navigate("/");
        }
    }, [currentUser, navigate, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", {
                username,
            });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            navigate(-1);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };


    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container>
                    <Form onSubmit={handleSubmit} className="my-2">
                        <Form.Group>
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <div className="mt-2">
                            <Button
                                className={`${btnStyles.btn} mr-2`}
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={`${btnStyles.btn}`}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}

export default UsernameForm