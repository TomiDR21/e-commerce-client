import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/cartproductcard.module.css';
import Nav from './nav';
const CartProductCard = ({cartQuantity, setCartQuantity, fetchCartItems, handleRemoveFromCart, cartItems }) => {


  return (
    
    <div className={styles.cartProductsContainer}>
     
      <div className={styles.cartProductGrid}>
        {cartItems.map((cartItem) => (
          <div key={cartItem.cart_item_id} className={styles.cartProductItem}>
            
            <h4>{cartItem.product_name} </h4>
            <img src={cartItem.image} alt={cartItem.name} />
            <div>{cartItem.description}</div>
            <div>${cartItem.price} </div>
            
            
            <button
              type="button"
              className={styles.remove}
              onClick={() => handleRemoveFromCart(cartItem.cart_item_id)}
            >
              Remove
            </button> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartProductCard;