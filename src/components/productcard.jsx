import React, { useState } from "react";
import axios from "axios";
import styles from "../css/productcard.module.css";
const ProductCard = ({ products, handleAddToCart, handleRemoveFromCart }) => {


  return (
    <div className={styles.productCardContainer}>
      {" "}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <h4>{product.name} </h4>
            <div>{product.description}</div>
            <div>${product.price} </div>
            <button type="text" className={styles.add} onClick={handleAddToCart}>Add to cart</button>
            <button type="text" className={styles.remove} onClick={handleRemoveFromCart}>Remove from cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
