import React, { useState } from "react";
import styles from "./css/nav.module.css";
import Subcategories from "./subcategories"


const Nav = () => {
  const [showSubcategories, setShowSubcategories] = useState(false);

  const handleMouseEnter = () => {
    setShowSubcategories(true);
  };

  const handleMouseLeave = () => {
    setShowSubcategories(false);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.homeCart}>
        <a href="http://localhost:3000/">E-Commerce</a>
        <div>Cart({})</div>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.categories}
      >
        <div>Categories</div>
        <div className={styles.subCategories}>
        {showSubcategories && <Subcategories/>}</div>
      </div>
      <div className={styles.userLogin}>
        <a href="http://localhost:3000/login">Login</a>
        <a href="http://localhost:3000/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Nav;
