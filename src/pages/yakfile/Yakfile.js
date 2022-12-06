// Yakfiles functionality credit goes to CI's Moments Project
import React from "react";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useSetYakfileData } from "../../contexts/YakfileDataContext";

const Yakfile = (props) => {
  const { yakfile, mobile, imageSize = 30 } = props;
  const { id, following_id, image, author } = yakfile;
  const currentUser = useCurrentUser();
  const is_author = currentUser?.username === author;
  const { handleFollow, handleUnfollow } = useSetYakfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/yakfile/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 text-dark`}>{author}</div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_author &&
          (following_id ? (
            <Button
              aria-label="Click here to unfollow profile"
              className={btnStyles.BtnUnfollow}
              onClick={() => handleUnfollow(yakfile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              aria-label="Click here to follow profile"
              className={btnStyles.Btn}
              onClick={() => handleFollow(yakfile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Yakfile;
