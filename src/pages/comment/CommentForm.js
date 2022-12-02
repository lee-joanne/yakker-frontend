import React, { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import { Form, InputGroup } from "react-bootstrap";
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const CommentForm = (props) => {
    const { post, setPost, setComments, yakfile_image, yakfile_id } = props;
    const [content, setContent] = useState("");
    const currentUser = useCurrentUser();

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
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup className="mt-4">
                    <Link to={`/yakfile/${yakfile_id}`}>
                        <Avatar src={yakfile_image} />
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
                className={`${btnStyles.btn} btn d-block ml-auto mt-1 mb-4`}
                disabled={!content.trim()}
                type="submit"
            >
                Comment
            </button>
        </Form>
    )
}

export default CommentForm