import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../components/css/cart.module.css";
import Nav from "../components/nav";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // ⬅️ importamos removeFromCart
  const productsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentCartItems = cartItems.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(cartItems.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
      setAnimationKey((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setAnimationKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <Nav />
      <div key={animationKey} className={styles.cartContainer}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className={styles.cartList}>
              {currentCartItems.map((item, index) => (
                    <div
                    key={index}
                    className={`${styles.cartItem} fadeInUp`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <button  className={styles.deleteButton} onClick={() => removeFromCart(item.cartId)}>
                   
  Remove
</button>

                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <button
                className={styles.prevButton}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                 ‹
              </button>
              <button
                className={styles.nextButton}
                onClick={nextPage}
                disabled={currentPage === Math.ceil(cartItems.length / productsPerPage)}
              >
                ›
              </button>
            </div>
            <a href="/purchase">Complete purchase</a>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
