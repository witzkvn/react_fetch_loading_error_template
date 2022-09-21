import React from "react";
import styles from "./user.module.css";

const UserCard = ({ user }) => {
  if (!user) {
    return <div className={`${styles.card} ${styles.loadingCard}`}></div>;
  }

  return (
    <div className={styles.card}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
