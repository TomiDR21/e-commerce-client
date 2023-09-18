
import React, { useState, useEffect } from "react";
import axios from "axios";
import CartProductCard from "../components/cart_productcard";
import Nav from "../components/nav";
import styles from '../css/cartpage.module.css';



 const CartPage = ({cartQuantity, setCartQuantity, fetchCartItems}) => {

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  
  const updateCartItems = () => {
    fetchCartItems(setCartItems);
  };
  
  // Make a GET request to retrieve cart items when the component mounts
  useEffect(() => {
    updateCartItems();
  }, []);
  
  
  // Make a GET request to retrieve cart items
  useEffect(() => {
    axios
      .get('http://localhost:5000/cartitems') // Use the correct endpoint
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error retrieving cart items:', error);
      });
  }, []); // Empty dependency array to run the effect once when the component mounts
  
  
  // DELETE
  const handleRemoveFromCart = (cartItemId) => {
  axios
    .delete(`http://localhost:5000/cartitems/${cartItemId}`)
    .then((response) => {
      if (response.status === 204) {
        console.log("Item removed from cart:", cartItemId);
        updateCartItems(); // Update cart items to reflect the change
        setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.cart_item_id !== cartItemId)
      );
        setCartQuantity(cartQuantity - 1);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error removing item from cart:", error);
    });
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
    }
  return (
    <div className={styles.containerCart}>
      <Nav cartQuantity={cartQuantity} setCartQuantity={setCartQuantity}></Nav>
       <CartProductCard cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} fetchCartItems={fetchCartItems}/>
    </div>
   
  )
}

export default CartPage 