// Yakfile page functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import shadowStyles from "../../App.module.css";
import PopularYakfiles from "./PopularYakfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/YakfilePagePopular.module.css";
import { useSetYakfileData, useYakfileData } from "../../contexts/YakfileDataContext";

function YakfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const setYakfileData = useSetYakfileData();
    const { pageYakfile } = useYakfileData();
    const [yakfile] = pageYakfile.results;
    const is_author = currentUser?.username === yakfile?.author;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageYakfile }] = await Promise.all([
                    axiosReq.get(`/yakfile/${id}`)
                ])
                setYakfileData(prevState => ({
                    ...prevState,
                    pageYakfile: { results: [pageYakfile] }
                }))
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id, setYakfileData]);

    const mainYakfile = (
        <>
            <Row noGutters className="px-3 text-center">
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
                            <Button className={btnStyles.btn}>Unfollow</Button>
                        ) : (
                            <Button className={btnStyles.btn}>Follow</Button>
                        ))}
                </Col>
                {yakfile?.content && <Col className="p-3">{yakfile.content}</Col>}
            </Row>
        </>
    );

    const mainYakfilePosts = (
        <>
            <hr />
            <p className="text-center">Profile owner's posts</p>
            <hr />
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