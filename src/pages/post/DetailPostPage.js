// Detail post functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";
import styles from "./../../styles/PostCreateEditFormList.module.css";
import CommentForm from './CommentForm';
import Post from './Post';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const DetailPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const yakfile_image = currentUser?.yakfile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/post/${id}`)
                ])
                setPost({ results: [post] })
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
                <Container className={`bg-white p-3 ${styles.ContainerBox}`}>
                    <p className="text-center">Comments</p>
                    <hr />
                    {currentUser ? (
                        <CommentForm
                            yakfile_id={currentUser.yakfile_id}
                            yakfile_image={yakfile_image}
                            post={id}
                            setPost={setPost}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) :
                        <>
                            <p>Sign in and be the first to comment!</p>
                        </>}
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