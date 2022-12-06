import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ height, message, spinner, src, width }) => {
  return (
    <div>
      {spinner && <Spinner animation="grow" variant="info" />}
      {src && <img alt={message} height={height} src={src} width={width} />}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Asset;
