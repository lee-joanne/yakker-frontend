import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import btnStyles from './../styles/Button.module.css'

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-5">
            <Container>
                <i class="fa-solid fa-face-dizzy"></i>
            </Container>
            <Container>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <Button className={btnStyles.btn} onClick={() => navigate(-1)} type="submit">Go back?</Button>
            </Container>
        </div >
    )
}

export default Page404