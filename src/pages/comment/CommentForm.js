//Comment form functionality credit goes to CI's Moments
import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "../../components/Avatar";
import { Link, useNavigate } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CommentForm = (props) => {
  const { post, setPost, setComments, yakfile_image, yakfile_id } = props;
  const [content, setContent] = useState("");
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comment/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comment_count: prevPost.results[0].comment_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      // console.log(err);
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className="mt-4">
          <Link to={`/yakfile/${yakfile_id}`}>
            <Avatar
              src={yakfile_image}
              aria-label="Click here to go to profile page"
            />
          </Link>
          <Form.Control
            placeholder={`${currentUser.username}'s thoughts on this...`}
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.Btn} btn d-block ml-auto mt-1 mb-4`}
        disabled={!content.trim()}
        aria-label="Click here to submit comment"
        type="submit"
      >
        Comment
      </button>
    </Form>
  );
};

export default CommentForm;
