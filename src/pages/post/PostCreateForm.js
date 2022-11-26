import React from 'react';
import { Form, Button, Image, Row, Container, Col, Alert } from "react-bootstrap";
import styles from "./../../styles/PostCreateEditForm.module.css"

const PostCreateForm = () => {
    return (
        <Form>
            <Row className="mt-3">
                <Container className={`${styles.ContainerBox} bg-white col-lg-7`}>
                    <Form.Group className="text-center">
                        <Form.Label
                            className="d-flex justify-content-center"
                            htmlFor="image-upload">
                            ASSET
                        </Form.Label>
                    </Form.Group>
                </Container>

                <Container className={`${styles.ContainerBox} bg-white col-lg-4`}>
                    <p>Text stuff</p>
                </Container>

            </Row>
        </Form >
    )
}

export default PostCreateForm