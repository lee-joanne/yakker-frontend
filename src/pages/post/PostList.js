// Post list functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from 'react-router-dom';
import Post from "./Post";
import styles from "./../../styles/PostCreateEditFormList.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from '../../components/Asset';
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PopularYakfiles from '../yakfile/PopularYakfiles';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PostList = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/post/?${filter}search=${search}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                // console.log(err)
                if (err.response?.status === 500) {
                    navigate('/500')
                }
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts()
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [filter, search, pathname, navigate, currentUser])

    return (
        <Row>
            <Col className={styles.HeaderText} lg={7}>
                <PopularYakfiles mobile />
                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
                <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                    <Form.Control type="text" placeholder="Search posts based on author, content, or title!"
                        value={search} onChange={handleSearch} />
                </Form>
                <Container>
                    {hasLoaded ? (
                        <>
                            {posts.results.length ? (
                                <InfiniteScroll children={posts.results.map((post) => (
                                    <Post key={post.id} {...post} setPosts={setPosts} />
                                ))
                                }
                                    dataLength={posts.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!posts.next}
                                    next={() => fetchMoreData(posts, setPosts)}
                                />
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
            <Col className={styles.HeaderText} lg={4}>
                <PopularYakfiles />
            </Col>
        </Row >
    )
}

export default PostList