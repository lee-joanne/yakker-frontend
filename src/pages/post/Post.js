// Post functionality credit goes to CI's Moments Project
import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "./../../components/Avatar";
import shadowStyles from "../../App.module.css";
import { Link, useNavigate } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import axios from "axios";

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
    detailedPostPage,
    image,
    updated_at,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_author = currentUser?.username === author;
  const navigate = useNavigate();

  const handleReyakks = async () => {
    try {
      const { data } = await axiosRes.post("/post_reyakks/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                reyakks_count: post.reyakks_count + 1,
                post_reyakks_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err)
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  const handleUnReyakks = async () => {
    try {
      await axios.delete(`/post_reyakks/${post_reyakks_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                reyakks_count: post.reyakks_count - 1,
                post_reyakks_id: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/post/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/post/${id}`);
      detailedPostPage ? navigate("/") : navigate(0);
    } catch (err) {
      // console.log(err);
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  return (
    <Card className={`mb-3 ${shadowStyles.Shadow}`}>
      <Card.Header>
        <Row>
          <Col>
            <Link
              aria-label="Click here to go to profile page"
              className={styles.YakfileLink}
              to={`/yakfile/${yakfile_id}`}
            >
              <Avatar src={yakfile_image} height={30} />
              {author}
            </Link>
            <div className="ml-2 pt-1">
              {is_author && (
                <>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Click to edit post</Tooltip>}
                  >
                    <i
                      className={`fa-solid fa-pen-to-square ml-1 ${styles.EditDeleteIcon}`}
                      onClick={handleEdit}
                    ></i>
                  </OverlayTrigger>
                  <span className="text-dark ml-1 mr-1"> | </span>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Click to delete post</Tooltip>}
                  >
                    <i
                      className={`fa-solid fa-trash ${styles.EditDeleteIcon}`}
                      onClick={handleDelete}
                    ></i>
                  </OverlayTrigger>
                </>
              )}
            </div>
          </Col>
          <Col>
            <div className={`text-right ${styles.PostFontColor}`}>
              Updated at: {updated_at}
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Link
          aria-label="Click here to go to detailed view of post"
          className={styles.ToDetailPost}
          to={`/post/${id}`}
        >
          {title && <Card.Text>{title}</Card.Text>}
        </Link>
        {content && (
          <Card.Text className={`${styles.Content} mt-2`}>
            {" "}
            {content}{" "}
          </Card.Text>
        )}
        <div className={styles.PostFontColor}>
          {is_author ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't reyakk your own posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : post_reyakks_id ? (
            <span onClick={handleUnReyakks}>
              <i className={`fa-solid fa-heart ${styles.Reyakked}`}></i>
            </span>
          ) : currentUser ? (
            <span onClick={handleReyakks}>
              <i className={`far fa-heart ${styles.ReyakkHover}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {reyakks_count}
          <i className={`fa-regular fa-comment ml-1`}></i>
          {comment_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
