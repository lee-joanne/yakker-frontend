//Comment delete and edit functionality credit goes to CI's Moments Project
import React, { useState } from 'react';
import CommentEditForm from './CommentEditForm';
import styles from "../../styles/Comment.module.css";
import { Card, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

const Comment = (props) => {
    const {
        yakfile_id,
        yakfile_image,
        commenter,
        updated_at,
        content,
        id,
        post,
        setPost,
        setComments
    } = props;

    const [editForm, setEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const [deleteStatus, setDeleteStatus] = useState(undefined);
    const is_commenter = currentUser?.username === commenter;

    const handleEdit = () => {
        setEditForm(true);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comment/${id}`);
            setDeleteStatus({ type: 'success' });
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comment_count: prevPost.results[0].comment_count - 1,
                    },
                ],
            }));
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) {
            console.log(err)
            setDeleteStatus({ type: 'err', err });
        }
    };

    return (
        <div>
            <>
                {deleteStatus?.type === 'success' &&
                    <Alert key="success" variant="success">
                        Comment successfully deleted
                    </Alert>}
                {deleteStatus?.type === 'error' && (
                    <Alert key="danger" variant="danger">
                        Sorry, we couldn't delete your comment. Please try again.
                    </Alert>
                )}
            </>
            <Card className="mb-3">
                <Card.Header>
                    <Link to={`/profiles/${yakfile_id}`}>
                        <Avatar src={yakfile_image} />
                    </Link>
                    <span className={styles.Commenter}>{commenter}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    {editForm ? (
                        <CommentEditForm
                            id={id}
                            yakfile_id={yakfile_id}
                            content={content}
                            yakfileImage={yakfile_image}
                            setComments={setComments}
                            setEditForm={setEditForm}
                            updated_at={updated_at}
                            post={post}
                        />
                    ) : (
                        null
                    )}
                    {is_commenter && !editForm && (
                        <>
                            <div className="text-right">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Click to edit comment</Tooltip>}><i className={`fa-solid fa-pen-to-square ml-1 ${styles.EditDeleteIcon}`} onClick={handleEdit}></i></OverlayTrigger>
                                <span className="text-dark ml-1 mr-1"> | </span>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Click to delete comment</Tooltip>}><i className={`fa-solid fa-trash ${styles.EditDeleteIcon}`} onClick={handleDelete} ></i></OverlayTrigger>
                            </div>
                        </>
                    )}
                </Card.Header>
                <Card.Body>
                    <p>{content}</p>
                </Card.Body>
            </Card >
        </div>
    );
};


export default Comment