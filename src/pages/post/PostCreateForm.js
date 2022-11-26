import React, { useState } from 'react';
import { Form, Button, Row, Container, Col, Image, Alert } from "react-bootstrap";
import Asset from '../../components/Asset';
import styles from "./../../styles/PostCreateEditForm.module.css";
import upload from "./../../assets/upload.png";
import btnStyles from "./../../styles/Button.module.css";
import appStyles from "./../../App.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

const PostCreateForm = () => {

    const currentUser = useCurrentUser();

    const imageInput = useRef(null);

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: ""
    });
    const { title, content, image } = postData;

    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", caption);
        formData.append("content", category);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/post/", formData);
            navigate(`/post/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
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
                    <Form.Control as="textarea" rows={6} name="content" placeholder={`What's on ${currentUser.username}'s mind?`} value={content} onChange={handleChange} />
                </Form.Group>
            </Form>
            <Button type="submit" className={btnStyles.btn}>Create Post</Button>
        </div>
    )

    return (
        <Form onSubmit={handleSubmit}>
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
                            <Form.Control type="file" className="p-1" onChange={handleChangeImage} accept="image/*" ref={imageInput} />
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