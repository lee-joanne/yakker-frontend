// Popular yakfiles functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from "../../App.module.css";
import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Yakfile from './Yakfile';

const PopularYakfiles = ({ mobile }) => {
    const [yakfileData, setYakfileData] = useState({
        pageYakfile: { results: [] },
        popularYakfiles: { results: [] },
    });
    const { popularYakfiles } = yakfileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/yakfile/?ordering=-follower_count'
                );
                setYakfileData(prevState => ({
                    ...prevState,
                    popularYakfiles: data,
                }))
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [currentUser]);

    return (
        <Card className={`bg-white mt-3 ${styles.Shadow} 
        ${mobile && "d-lg-none text-center mb-3"}`}>
            {popularYakfiles.results.length ? (
                <>
                    <Card.Header>
                        <p className="text-center mb-0">Popular Yakfiles</p>
                    </Card.Header>
                    {mobile ? (
                        <Card.Body className="d-flex justify-content-around small">
                            {popularYakfiles.results.slice(0, 4).map((yakfile => (
                                <Yakfile key={yakfile.id} yakfile={yakfile} mobile />
                            )))}
                        </Card.Body>
                    ) : (
                        <Card.Body>
                            {popularYakfiles.results.map((yakfile => (
                                <Yakfile key={yakfile.id} yakfile={yakfile} />
                            )))}
                        </Card.Body>
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Card>
    )
}

export default PopularYakfiles