import React from "react";
import styles from "./css/nav.module.css";
const Subcategories = () => {
  const subcategories = ["Subcategory 1", "Subcategory 2", "Subcategory 3"];

  return (
    <div>
      {subcategories.map((subcategory, index) => (
        <div key={index} className={styles.subcategory}>{subcategory}</div>
      ))}
    </div>
  );
};

export default Subcategories;