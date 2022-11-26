import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Asset = ({ spinner, src, height, message }) => {
    return (
        <div>
            {spinner && <Spinner animation="grow" variant="info" />}
            {src && <img src={src} alt={message} height={height} width={height} />}
            {message && <p>{message}</p>}
        </div>
    )
};



export default Asset