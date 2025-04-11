import React, { useEffect, useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/css/nav.module.css';
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext"; // ✅ Import UserContext


const Nav = () => {


  const { user, setUser, logout } = useContext(UserContext); // ✅ Use global state
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode user info (if stored) - for now, just setting a placeholder
      const storedUser = JSON.parse(localStorage.getItem('user')) || { username: 'User' };
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Remove user info
    setUser(null);
    setCartItems([]);
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
<div className={styles.navContainer}>
  <div className={styles.homeCart}>
    <a href="/">MercadoRestringido</a>
    <a href="/cart">Cart ({cartItems.length})</a>
    
  </div>
    
  <div className={styles.userLogin}>
    {user ? (
      <>
        <span>Hello, {user.username}</span>
        <a href="/profile">Profile</a>
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <a href="/login">Login</a>
        <a href="/signup">Sign up</a>
      </>
    )}
  </div>
  
</div>
<div className={styles.navDivider}></div>
</>
  );
};

export default Nav;
