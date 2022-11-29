import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import Post from "./Post";
import styles from "./../../styles/PostCreateEditFormList.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from '../../components/Asset';
import NoResults from "../../assets/no-results.png"

const PostList = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/post/?${filter}search=${search}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [filter, search, pathname])

    return (
        <Row>
            <Col className={styles.HeaderText} lg={8}>
                <p>Popular profiles</p>
                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
                <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                    <Form.Control type="text" placeholder="Search posts based on author, content, or title!"
                        value={search} onChange={handleSearch} />
                </Form>
                <Container>
                    {hasLoaded ? (
                        <>
                            {posts.results.length ? (
                                posts.results.map((post) => (
                                    <Post key={post.id} {...post} setPosts={setPosts} />
                                ))
                            ) : (
                                <Container className={"text-center d-flex justify-content-center p-4"}>
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