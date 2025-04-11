import React, { useState } from 'react';
import styles from '../components/css/userAuth.module.css';
import Nav from '../components/nav';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }) // ✅ Send correct format
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed');
      } else {
        alert('Signup successful! Please log in.');
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
<>
  <Nav />
  <div className={styles.wrapper}>
    <form className={styles.formContainer} onSubmit={handleSignUp}>
      <h2>Sign Up</h2>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.formGroup}>
        <label className={styles.label}>Username</label>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className={styles.button} type="submit">Sign Up</button>
    </form>
  </div>
</>

  );
};

export default SignUp;

