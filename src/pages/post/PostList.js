import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import Post from "./Post";
import styles from "./../../styles/PostList.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from '../../components/Asset';
import NoResults from "../../assets/no-results.png"

const PostList = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/post/?${filter}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false)
        fetchPosts()
    }, [filter, pathname])

    return (
        <Row>
            <Col className={styles.HeaderText} lg={8}>
                <p>Popular profiles</p>
                <Container>
                    {hasLoaded ? (
                        <>
                            {posts.results.length ? (
                                posts.results.map((post) => (
                                    <Post key={post.id} {...post} setPosts={setPosts} />
                                ))
                            ) : (
                                <Container className="text-center d-flex justify-content-center p-4">
                                    <Asset src={NoResults} message={message} height={100} width={100} />
                                </Container>
                            )}
                        </>
                    ) : (
                        <Container className="d-flex justify-content-center p-5">
                            <Asset spinner />
                        </Container>
                    )}
                </Container>
            </Col>
            <Col className={styles.HeaderText} lg={3}>
                <p>
                    Popular profiles for desktop
                </p>
            </Col>
        </Row >
    )
}

export default PostList