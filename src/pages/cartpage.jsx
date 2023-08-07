import styles from "../css/cartpage.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";



 const CartPage = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/cartitems")
      .then(res => {
            console.log(res.data);
            setCartItems(res.data);
        })
      .catch(err => {
            console.log(err);
        })
    }, [])


  return (
    <div>CartPage</div>
  )
}

export default CartPage 