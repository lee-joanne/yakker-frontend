import React from "react";

import styles from "../styles/Avatar.module.css";

const Avatar = ({ height = 45, src, yakfile }) => {
  return (
    <span>
      <img
        alt="avatar"
        className={styles.Avatar}
        height={height}
        src={src}
        width={height}
      />
      {yakfile}
    </span>
  );
};

export default Avatar;
