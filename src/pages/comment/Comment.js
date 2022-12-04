//Comment delete and edit functionality credit goes to CI's Moments Project
import React, { useState } from 'react';
import CommentEditForm from './CommentEditForm';
import styles from "../../styles/Comment.module.css";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import reyakkStyles from "../../styles/Post.module.css";
import { axiosRes } from '../../api/axiosDefaults';
import axios from 'axios';

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
        setComments,
        comment_reyakks_id,
        comment_reyakks_count,
    } = props;

    const [editForm, setEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_commenter = currentUser?.username === commenter;
    const navigate = useNavigate();

    const handleEdit = () => {
        setEditForm(true);
    };

    const handleReyakks = async () => {
        try {
            const { data } = await axiosRes.post('/comment_reyakks/', { comment: id });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? { ...comment, comment_reyakks_count: comment.comment_reyakks_count + 1, comment_reyakks_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err)
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    }

    const handleUnReyakks = async () => {
        try {
            await axios.delete(`/comment_reyakks/${comment_reyakks_id}`);
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? { ...comment, comment_reyakks_count: comment.comment_reyakks_count - 1, comment_reyakks_id: null }
                        : comment;
                }),
            }));
        } catch (err) {
            console.log(err);
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comment/${id}`);
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
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    };

    return (
        <Card className="mb-3">
            <Card.Header>
                <Link to={`/profiles/${yakfile_id}`}>
                    <Avatar src={yakfile_image} />
                </Link>
                <span className={styles.Commenter}>{commenter}</span>
                <span className={styles.Date}>{updated_at}</span>
                <div className="text-right">
                    {is_commenter ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't reyakk your own comments!</Tooltip>}>
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : comment_reyakks_id ? (
                        <span onClick={handleUnReyakks}><i className={`fa-solid fa-heart ${reyakkStyles.Reyakked}`}></i></span>
                    ) : currentUser ? (
                        <span onClick={handleReyakks}><i className={`far fa-heart ${reyakkStyles.ReyakkHover}`} /></span>
                    ) : (
                        <OverlayTrigger placement="top" overlay={<Tooltip>Log in to like posts!</Tooltip>}><i className="far fa-heart" /></OverlayTrigger>
                    )}
                    {comment_reyakks_count}
                </div>
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
    );
};


export default Comment