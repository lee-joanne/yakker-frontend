import React, { useState } from 'react';
import styles from "../../styles/Comment.module.css";
import { Card, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Comment = (props) => {
    const { yakfile_id, yakfile_image, commenter, updated_at, content } = props;
    const currentUser = useCurrentUser();
    const [deleteStatus, setDeleteStatus] = useState(undefined);
    const is_commenter = currentUser?.username === commenter;

    return (
        <div>
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <Link to={`/profiles/${yakfile_id}`}>
                                <Avatar src={yakfile_image} />
                            </Link>
                            <span className={styles.Commenter}>{commenter}</span>
                            <span className={styles.Date}>{updated_at}</span>
                        </Col>
                        <Col>
                            {is_commenter && (
                                <>
                                    <div className="text-right">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Click to edit post</Tooltip>}><i className={`fa-solid fa-pen-to-square ml-1 ${styles.EditDeleteIcon}`} onClick={() => { }}></i></OverlayTrigger>
                                        <span className="text-dark ml-1 mr-1"> | </span>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Click to delete post</Tooltip>}><i className={`fa-solid fa-trash ${styles.EditDeleteIcon}`} onClick={() => { }}></i></OverlayTrigger>
                                    </div>
                                </>
                            )}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <p>{content}</p>
                </Card.Body>
            </Card>
        </div>
    );
};


export default Comment