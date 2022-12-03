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
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

const DetailPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const yakfile_image = currentUser?.yakfile_image;
    const [comments, setComments] = useState({ results: [] });

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
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll children={comments.results.map(comment => (
                            <Comment
                                key={comment.id}
                                {...comment}
                                setPost={setPost}
                                setComments={setComments}
                            />
                        ))}
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>It's lonely here... leave a comment?</span>
                    ) : (
                        <span>No comments... sign up or login if you want to comment!</span>
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