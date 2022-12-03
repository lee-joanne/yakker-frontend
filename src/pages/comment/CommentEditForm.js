//Comment edit functionality credit goes to CI's Moments Project
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Comment.module.css";
import btnStyles from "../../styles/Button.module.css";

function CommentEditForm(props) {
    const { id, content, setEditForm, setComments, post } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comment/${id}`, {
                content: formContent.trim(),
                post: post
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {

                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            post: post
                        }
                        : comment;
                }),
            }));
            setEditForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right p-2">
                <button
                    className={`p-2 ${btnStyles.btn}`}
                    onClick={() => setEditForm(false)}
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className={`ml-2 p-2 ${btnStyles.btn}`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Save Changes
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;