import React, { useState } from 'react';
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import Asset from '../../components/Asset';
import styles from "./../../styles/PostCreateEditForm.module.css";
import upload from "./../../assets/upload.png";
import btnStyles from "./../../styles/Button.module.css";

const PostCreateForm = () => {

    const [errors, setErrors] = useState({});

    const textFields = (
        <div className="text-center">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className={styles.FormText}>Title</Form.Label>
                    <Form.Control type="text" placeholder="Add a nice title here" name="title" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className={styles.FormText}>Content</Form.Label>
                    <Form.Control as="textarea" rows={6} name="content" placeholder="Yak away, my friend" />
                </Form.Group>
            </Form>
            <Button type="submit" className={btnStyles.btn}>Create Post</Button>
        </div>
    )

    return (
        <Form>
            <Row className="mt-3">
                <Col lg={6}>
                    <Container className={`${styles.ContainerBox} bg-white p-5`}>
                        <Form.Group className="text-center">
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload">
                                <Asset src={upload} message="Upload image here!" height={50} width={50} />
                            </Form.Label>
                        </Form.Group>
                    </Container>
                </Col>
                <Col lg={5}>
                    <Container className={`${styles.ContainerBox} bg-white p-2`}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form >
    )
}

export default PostCreateForm