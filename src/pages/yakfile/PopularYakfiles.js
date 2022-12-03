import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from "../../App.module.css";
import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const PopularYakfiles = () => {
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
        <Card className={`bg-white mt-3 ${styles.Shadow}`}>
            {popularYakfiles.results.length ? (
                <>
                    <Card.Header>
                        <p className="text-center mb-0">Popular Yakfiles</p>
                    </Card.Header>
                    <Card.Body>
                        {popularYakfiles.results.map(yakfile => (
                            <p key={yakfile.id}>{yakfile.author}</p>
                        ))}
                    </Card.Body>
                </>
            ) : (
                <Asset spinner />
            )}
        </Card>
    )
}

export default PopularYakfiles