import React from 'react';
import styles from "../../styles/Comment.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from '../../components/Avatar';

const Comment = (props) => {
    const { yakfile_id, yakfile_image, commenter, updated_at, content } = props
    return (
        <div>
            <Card>
                <Card.Header>
                    <Link to={`/profiles/${yakfile_id}`}>
                        <Avatar src={yakfile_image} />
                    </Link>
                    <span className={styles.Commenter}>{commenter}</span>
                    <span className={styles.Date}>{updated_at}</span>
                </Card.Header>
                <Card.Body>
                    <p>{content}</p>
                </Card.Body>
            </Card>
        </div>
    );
};


export default Comment