// Yakfile page functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Image, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import shadowStyles from "../../App.module.css";
import PopularYakfiles from "./PopularYakfiles";
import Post from "../post/Post";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/YakfilePagePopular.module.css";
import { useSetYakfileData, useYakfileData } from "../../contexts/YakfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";

function YakfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const navigate = useNavigate();
    const [yakfilePosts, setYakfilePosts] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setYakfileData, handleFollow, handleUnfollow } = useSetYakfileData();
    const { pageYakfile } = useYakfileData();
    const [yakfile] = pageYakfile.results;
    const is_author = currentUser?.username === yakfile?.author;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageYakfile }, { data: yakfilePosts }] = await Promise.all([
                    axiosReq.get(`/yakfile/${id}`),
                    axiosReq.get(`/post/?author__yakfile=${id}`),
                ]);
                setYakfileData(prevState => ({
                    ...prevState,
                    pageYakfile: { results: [pageYakfile] },
                }));
                setYakfilePosts(yakfilePosts);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err)
                if (err.response?.status === 500) {
                    navigate('/500')
                }
            }
        };
        fetchData()
    }, [id, setYakfileData, navigate]);

    const mainYakfile = (
        <>
            <Row className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.YakfileImage} roundedCircle src={yakfile?.image} />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{yakfile?.author}</h3>
                    <Row className="justify-content-around no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{yakfile?.post_count}</div>
                            <div>posts</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{yakfile?.follower_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{yakfile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser && !is_author && (
                        yakfile?.following_id ? (
                            <Button className={btnStyles.Btn} onClick={() => handleUnfollow(yakfile)}>Unfollow</Button>
                        ) : (
                            <Button className={btnStyles.Btn} onClick={() => handleFollow(yakfile)}>Follow</Button>
                        ))}
                    {yakfile?.is_author &&
                        <>
                            <div>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Click to edit yakfile</Tooltip>}><i className={`fa-solid fa-file-pen ${styles.EditDeleteIcon}`} onClick={() => { navigate(`/yakfile/${id}/edit`) }}></i></OverlayTrigger>
                                <span className="text-dark ml-1 mr-1"> | </span>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Click to change username</Tooltip>}><i className={`fa-solid fa-user-pen ${styles.EditDeleteIcon}`} onClick={() => { navigate(`/yakfile/${id}/edit/username`) }}></i></OverlayTrigger>
                                <span className="text-dark ml-1 mr-1"> | </span>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Click to change password</Tooltip>}><i className={`fa-solid fa-lock ${styles.EditDeleteIcon}`} onClick={() => { navigate(`/yakfile/${id}/edit/password`) }} ></i></OverlayTrigger>
                            </div>
                        </>}
                </Col>
                {yakfile?.content && <Col className="p-3">{yakfile.content}</Col>}
            </Row>
        </>
    );

    const mainYakfilePosts = (
        <>
            <hr />
            <p className="text-center">{yakfile?.author}'s posts</p>
            {yakfilePosts.results.length ? (
                <div className={styles.PageFont}>
                    <InfiniteScroll
                        children={yakfilePosts.results.map((post) => (
                            <Post key={post.id} {...post} setPosts={setYakfilePosts} />
                        ))}
                        dataLength={yakfilePosts.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!yakfilePosts.next}
                        next={() => fetchMoreData(yakfilePosts, setYakfilePosts)}
                    />
                </div>
            ) : (
                <Container className={"text-center d-flex justify-content-center p-4"}>
                    <Asset src={NoResults} height={100} width={100} message={`No results found, ${yakfile?.author} hasn't posted yet.`} />
                </Container>
            )
            }
        </>
    );

    return (
        <Container>
            <PopularYakfiles mobile />
            <Row>
                <Col className={`bg-white py-2 p-0 p-lg-2 ${shadowStyles.Shadow}`} lg={8}>
                    <Container>
                        {hasLoaded ? (
                            <>
                                {mainYakfile}
                                {mainYakfilePosts}
                            </>
                        ) : (
                            <Asset spinner />
                        )}
                    </Container>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    <PopularYakfiles />
                </Col>
            </Row>
        </Container>
    );
}

export default YakfilePage;