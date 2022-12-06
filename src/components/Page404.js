import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

import fontStyles from "../App.module.css";
import gif from "../assets/page-404.gif";
import btnStyles from "../styles/Button.module.css";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-3">
      <Container>
        <img alt="Not found" src={gif} />
      </Container>
      <Container className="mt-1">
        <p className={fontStyles.HeadingFont}>Page does not exist</p>
        <Button
          className={btnStyles.Btn}
          onClick={() => navigate(-1)}
          type="submit"
        >
          Go back
        </Button>
      </Container>
    </div>
  );
};

export default Page404;
