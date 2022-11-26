import React, { useState } from 'react';
import { Form, Button, Row, Container, Col, Image } from "react-bootstrap";
import Asset from '../../components/Asset';
import styles from "./../../styles/PostCreateEditForm.module.css";
import upload from "./../../assets/upload.png";
import btnStyles from "./../../styles/Button.module.css";
import appStyles from "./../../App.module.css"

const PostCreateForm = () => {

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: ""
    });
    const { title, content, image } = postData;

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        })
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    // const [errors, setErrors] = useState({});

    const textFields = (
        <div className="text-center">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className={styles.FormText}>Title</Form.Label>
                    <Form.Control type="text" placeholder="Add a nice title here" name="title" value={title} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={styles.FormText}>Content</Form.Label>
                    <Form.Control as="textarea" rows={6} name="content" placeholder="Yak away, my friend" value={content} onChange={handleChange} />
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
                            {image ? (
                                <>
                                    <figure>
                                        <Image src={image} className={appStyles.Image} rounded />
                                    </figure>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload">
                                    <Asset src={upload} message="Select 'choose file' to upload your image!" height={50} width={50} />
                                </Form.Label>
                            )}
                            <Form.Control type="file" onChange={handleChangeImage} accept="image/*" />
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