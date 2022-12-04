import React from 'react';
import logoImage from "../../assets/yakker-logo-image.png";
import shadowStyles from "../../App.module.css";
import styles from "../../styles/About.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const About = () => {
    return (
        <Container className={`bg-white col-md-8 ${shadowStyles.Shadow}`}>
            <Row className="p-4 mt-5 justify-content-md-center">
                <Col className="text-center">
                    <Container><i className="fa-solid fa-question"></i>
                        <Image
                            src={logoImage}
                            className={styles.LogoImage}
                        />
                        <h1 className="mb-3">What is Yakker?</h1>
                        <p className="text-left">Yakker serves as a social media platform where you can post about anything you wish!
                            Think of this website as Twitter, but with yaks instead. Sign up with a new account (no email address required for those who
                            don't want to compromise personal data) as easy as 1, 2, 3. Once you're logged in, you have the option to create a post
                            (post about anything you want!). Add a photo to your post, a title, and some content. There are no character limits for content,
                            but the title will have a limit of 300 characters. Photos will be required for your post! Don't have a photo? Show us a photo of a
                            cat you walked past the other day. You can like (reyakk) other user's posts, make comments, follow other users, and reyakk comments! You can keep track
                            of posts you reyakked to in the "Reyakked" link in the navigation bar. Once you start following users, their posts will show up in the
                            "Feed" link in navigation. You can also manage your profile and change your profile photo if you wish.
                            Most importantly, you have the freedom to delete your posts/comments and edit your posts/comments as well, so don't sweat it
                            if you wrote something really embarrassing!</p>
                        <p>So what are you waiting for? Yak away!</p>
                    </Container>
                </Col>
            </Row >
        </Container >
    )
}

export default About