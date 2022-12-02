// Detail post functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";
import styles from "./../../styles/PostCreateEditFormList.module.css";
import CommentForm from '../comment/CommentForm';
import Post from './Post';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Comment from '../comment/Comment';

const DetailPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const yakfile_image = currentUser?.yakfile_image;
    const [comments, setComments] = useState({ results: [] });
    const is_post_author = currentUser?.username === post.author

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/post/${id}`),
                    axiosReq.get(`/comment/?post=${id}`),
                ]);
                setPost({ results: [post] });
                setComments(comments);
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
                    {is_post_author ? (
                        <p>You can't comment on your own posts!</p>
                    ) : !is_post_author ? (
                        <CommentForm
                            yakfile_id={currentUser.yakfile_id}
                            yakfile_image={yakfile_image}
                            post={id}
                            setPost={setPost}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        comments.results.map(comment => (
                            <Comment key={comment.id} {...comment} />
                        ))
                    ) : currentUser ? (
                        <span>No comments yet, be the first to comment</span>
                    ) : (
                        <span>No comments yet</span>
                    )}
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