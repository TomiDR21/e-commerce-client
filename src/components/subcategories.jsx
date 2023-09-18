import React from "react";
import styles from "../css/nav.module.css";
const Subcategories = () => {
  const subcategories = ["-Smartphones", "-Tablets", "-Consoles", "-Peripherals", "-TV's", "-Computers", "-Cameras", "-Kitchen", "-Others"];

  return (
    <div>
      {subcategories.map((subcategory, index) => (
        <div key={index} className={styles.subcategory}>{subcategory}</div>
      ))}
    </div>
  );
};

export default Subcategories;