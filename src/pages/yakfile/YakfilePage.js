// Yakfile page functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import shadowStyles from "../../App.module.css";
import PopularYakfiles from "./PopularYakfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function YakfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();

    useEffect(() => {
        setHasLoaded(true);
    }, [])

    const mainYakfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <p>Image</p>
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">Profile username</h3>
                    <p>Profile stats</p>
                </Col>
                <Col lg={3} className="text-lg-right">
                    <p>Follow button</p>
                </Col>
                <Col className="p-3">Profile content</Col>
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
        <Row>
            <Col className={`bg-white py-2 p-0 p-lg-2 ${shadowStyles.Shadow}`} lg={8}>
                <PopularYakfiles mobile />
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
    );
}

export default YakfilePage;