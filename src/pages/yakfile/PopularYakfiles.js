// Popular yakfiles functionality credit goes to CI's Moments Project
import React from 'react';
import Card from 'react-bootstrap/Card';
import styles from "../../App.module.css";
import Asset from '../../components/Asset';
import { useYakfileData } from '../../contexts/YakfileDataContext';
import Yakfile from './Yakfile';
import yakfileStyles from "../../styles/YakfilePagePopular.module.css";

const PopularYakfiles = ({ mobile }) => {
    const { popularYakfiles } = useYakfileData();

    return (
        <Card className={`bg-white ${styles.Shadow} ${yakfileStyles.YakfileFont}
        ${mobile && "d-lg-none text-center mb-3"}`}>
            {popularYakfiles.results.length ? (
                <>
                    <Card.Header>
                        <p className="text-center font-weight-bold mb-0">Popular Yakfiles</p>
                    </Card.Header>
                    {mobile ? (
                        <Card.Body className="d-flex justify-content-around small">
                            {popularYakfiles.results.slice(0, 4).map((yakfile => (
                                <Yakfile key={yakfile.id} yakfile={yakfile} mobile />
                            )))}
                        </Card.Body>
                    ) : (
                        <Card.Body className="pt-2 pb-2">
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