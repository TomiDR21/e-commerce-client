import React from "react";
import styles from "./css/productcard.module.css";
const ProductCard = ({ products }) => {
  return (
    <div className={styles.productCardContainer}>
      {" "}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <h4>{product.name} </h4>
            <div>{product.description}</div>
            <div>${product.price} </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
