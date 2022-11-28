import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import styles from "./../../styles/PostList.module.css"

const PostList = () => {
    return (
        <Row>
            <Col className={styles.HeaderText} lg={8}>
                <p>Popular profiles</p>
                <Container>
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

export default PostList