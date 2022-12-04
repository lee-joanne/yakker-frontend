import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/YakfilePagePopular.module.css";

const YakfileEditForm = () => {
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const imageFile = useRef();

    const [yakfileData, setYakfileData] = useState({
        name: "",
        content: "",
        image: "",
    });
    const { name, content, image } = yakfileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.yakfile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/yakfile/${id}`);
                    const { name, content, image } = data;
                    setYakfileData({ name, content, image });
                } catch (err) {
                    console.log(err);
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        };

        handleMount();
    }, [currentUser, navigate, id]);

    const handleChange = (event) => {
        setYakfileData({
            ...yakfileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("content", content);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/yakfile/${id}`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                yakfile_image: data.image,
            }));
            navigate(-1);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label className={`${styles.PageFont} ${styles.BlueFont}`}>About me</Form.Label>
                <Form.Control
                    as="textarea"
                    value={content}
                    onChange={handleChange}
                    name="content"
                    rows={7}
                />
            </Form.Group>

            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
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
                    Update
                </Button>
            </div>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.Control type="file" id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setYakfileData({
                                            ...yakfileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }} />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default YakfileEditForm;