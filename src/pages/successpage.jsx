import React from 'react'
import styles from "../components/css/successpage.module.css";
const SuccessPage = () => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successMessage}>
        User successfully created ✔
      </div>
      <a href="http://localhost:3000/">Go back to homepage</a>
    </div>
  );
}


export default SuccessPage