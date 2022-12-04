// Editing post functionality credit goes to CI's Moments Project
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Row, Container, Col, Image, Alert } from "react-bootstrap";
import styles from "./../../styles/PostCreateEditFormList.module.css";
import btnStyles from "./../../styles/Button.module.css";
import appStyles from "./../../App.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

const EditPostForm = () => {

    const [errors, setErrors] = useState({});
    const currentUser = useCurrentUser();
    const imageInput = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: ""
    });
    const { title, content, image } = postData;

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/post/${id}`)
                const { title, content, image, is_author } = data
                is_author ? setPostData({ title, content, image }) : navigate(-1)
            } catch (err) {
                console.log(err)
                if (err.response?.status === 500) {
                    navigate('/500')
                }
            }
        }
        handleMount();
    }, [navigate, id])

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

        formData.append("title", title);
        formData.append("content", content);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/post/${id}`, formData);
            navigate(`/post/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col lg={6}>
                    <Container className={`${appStyles.Shadow} bg-white p-5 mt-3`}>
                        <Form.Group className="text-center">
                            <figure>
                                <Image src={image} className={appStyles.Image} rounded />
                            </figure>
                            <Form.Control type="file" className="p-1" onChange={handleChangeImage} accept="image/*" ref={imageInput} />
                        </Form.Group>
                        {errors.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Container>
                </Col>
                <Col lg={5}>
                    <Container className={`${appStyles.Shadow} bg-white p-2 mt-3`}>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.HeaderText}>Title</Form.Label>
                            <Form.Control type="text" placeholder="Add a nice title here" name="title" value={title} onChange={handleChange} />
                        </Form.Group>
                        {errors.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.HeaderText}>Content</Form.Label>
                            <Form.Control as="textarea" rows={6} name="content" placeholder={`What's on ${currentUser.username}'s mind?`} value={content} onChange={handleChange} />
                        </Form.Group>
                        {errors.content?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className='text-center mb-2'>
                            <Button onClick={() => navigate(-1)} className={`${btnStyles.btn}`}><i className="fa-solid fa-arrow-left"></i> Go back</Button>
                            <Button type="submit" className={`${btnStyles.btn} ml-2`}>Edit Post</Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Form >

    )
}

export default EditPostForm