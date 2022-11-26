import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import styles from "./../../styles/PostCreateEditForm.module.css"

const DetailPostPage = () => {

    return (
        <Row>
            <Col className={styles.HeaderText} lg={8}>
                <p>Popular profiles</p>
                <p>Content</p>
                <Container className={`bg-white p-5 ${styles.ContainerBox}`}>
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

export default DetailPostPage