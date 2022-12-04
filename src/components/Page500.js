import React from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import gif from '../assets/page-500.gif';
import btnStyles from './../styles/Button.module.css';
import fontStyle from "./../App.module.css";

const Page500 = () => {
    const navigate = useNavigate();

    return (
        <div className={`text-center mt-3`}>
            <Container>
                <img src={gif} alt="Not found..." />
            </Container>
            <Container className="mt-1">
                <p className={fontStyle.HeadingFont}>Sorry... there's something wrong. It's not you, it's us.</p>
                <Button className={btnStyles.btn} onClick={() => navigate(-1)} type="submit">Go back?</Button>
            </Container>
        </div >
    )
}

export default Page500