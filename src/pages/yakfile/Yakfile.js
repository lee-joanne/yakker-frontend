// Yakfiles functionality credit goes to CI's Moments Project
import React from 'react';
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Yakfile = (props) => {
    const { yakfile, mobile, imageSize = 30 } = props;
    const { id, following_id, image, author } = yakfile;
    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author;

    return (
        <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
            <div>
                <Link className="align-self-center" to={`/yakfile/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 text-dark`}>
                {author}
            </div>
            <div className={`text-right ${!mobile && 'ml-auto'}`}>
                {!mobile && currentUser && !is_author && (
                    following_id ? (
                        <Button className={btnStyles.btn}>Unfollow</Button>
                    ) : (
                        <Button className={btnStyles.btn}>Follow</Button>
                    )
                )}
            </div>
        </div>
    )
}

export default Yakfile