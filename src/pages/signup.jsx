import styles from '../components/css/userAuth.module.css';
import Nav from '../components/nav'
import React from 'react'

const SignUp = () => {
  return (
    
    <><Nav></Nav>
    <div className={styles.wrapper}>
      
      <form className={styles.formContainer}>
        <div>Sign up</div>
        <div>
          <label>Enter username</label>
          <input type="text" />
        </div>
        <div>
          <label>Enter password</label>
          <input type="password" />
        </div>
        <button>Sign up</button>
      </form>
    </div></>
  );
};

export default SignUp