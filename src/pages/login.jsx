import React, { useState, useContext } from 'react';
import styles from '../components/css/userAuth.module.css';
import Nav from '../components/nav';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../context/UserContext'; // ✅ Import UserContext

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // ✅ Get login function from context
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Set loading state immediately to true
    setLoading(true);
  
    // Wait for 2 seconds before proceeding
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.message || 'Login failed');
        } else {
          login(data.user, data.token); // ✅ This updates UserContext and localStorage
          navigate('/');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 2000); // 2 seconds delay
  };
  
  return (
    <>
      <Nav />
      {loading ? (
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <p>Signing in...</p>
              </div>
            ) : (
      <div className={styles.wrapper}>
        <form className={styles.formContainer} onSubmit={handleLogin}>
          <h2>Sign in</h2>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formGroup}>
            <label className={styles.label}>Username or Email</label>
            <input 
              type="text" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>)}
    </>
  );
};

export default Login;
