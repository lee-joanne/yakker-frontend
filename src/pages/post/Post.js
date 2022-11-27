import React from 'react';
import styles from "../../styles/Post.module.css"
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Avatar from "./../../components/Avatar"
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

const Post = (props) => {
    const {
        id,
        author,
        yakfile_id,
        yakfile_image,
        comment_count,
        reyakks_count,
        post_reyakks_id,
        title,
        content,
        image,
        updated_at,
        detailedPostPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author

    const handleReyakks = async () => {
        try {
            const { data } = await axiosRes.post('/post_reyakks/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, reyakks_count: post.reyakks_count + 1, post_reyakks_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col><Link className={styles.YakfileLink} to={`/yakfile/${yakfile_id}`}><Avatar src={yakfile_image} height={30} />{author}</Link>
                        <div>
                            {is_author && detailedPostPage && "..."}
                        </div>
                    </Col>
                    <Col><div>Updated at: {updated_at}</div></Col>
                </Row>
            </Card.Header>
            <Card.Img variant="top" src={image} />
            <hr />
            <Card.Body>
                {title && <Card.Text>{title}</Card.Text>}
                {content && <Card.Text className={styles.Content}> {content} </Card.Text>}
                <div>
                    {is_author ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't reyakk your own posts!</Tooltip>}>
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : post_reyakks_id ? (
                        <span onClick={() => { }}><i className={`fa-solid fa-heart ${styles.Reyakked}`}></i></span>
                    ) : currentUser ? (
                        <span onClick={handleReyakks}><i className={`far fa-heart ${styles.ReyakkHover}`} /></span>
                    ) : (
                        <OverlayTrigger placement="top" overlay={<Tooltip>Log in to like posts!</Tooltip>}><i className="far fa-heart" /></OverlayTrigger>
                    )}
                    {reyakks_count}
                    <i className={`fa-regular fa-comment ml-1`}></i>{comment_count}
                </div>
            </Card.Body>
        </Card >
    )
}

export default Post