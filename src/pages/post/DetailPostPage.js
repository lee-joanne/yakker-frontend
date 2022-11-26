import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";
import styles from "./../../styles/PostCreateEditForm.module.css";
import Post from './Post';

const DetailPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/post/${id}`)
                ])
                setPost({ results: [post] })
                console.log(post)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [id])

    return (
        <Row>
            <Col className={styles.HeaderText} lg={8}>
                <p>Popular profiles</p>
                <Post {...post.results[0]} setPost={setPost} detailedPostPage />
                <Container className={`bg-white p-5 ${styles.ContainerBox}`}>
                    Comments
                </Container>
            </Col>
            <Col className={styles.HeaderText} lg={3}>
                <p>
                    Popular profiles for desktop
                </p>
            </Col>
        </Row>
    )
}

export default DetailPostPage