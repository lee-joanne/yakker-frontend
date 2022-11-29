import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import gif from '../assets/page-404.gif';
import btnStyles from './../styles/Button.module.css';
import fontStyle from "./../App.module.css";

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className={`text-center mt-3`}>
            <Container>
                <img src={gif} alt="Not found..." />
            </Container>
            <Container className="mt-1">
                <p className={fontStyle.HeadingFont}>Oops! The page you're looking for doesn't exist.</p>
                <Button className={btnStyles.btn} onClick={() => navigate(-1)} type="submit">Go back?</Button>
            </Container>
        </div >
    )
}

export default Page404