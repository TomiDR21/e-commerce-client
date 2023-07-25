import styles from '../components/css/userAuth.module.css';

import React from 'react'

 const SignUp = () => {
  return (
    
    <form className={styles.formContainer}>
        <div>Sign up</div>
        <div>
        <label htmlFor="">Enter username</label>
        <input type="text" /></div>
        <div>
        <label htmlFor="">Enter password</label>
        <input type="password" /></div>


    </form>
  )
}
export default SignUp