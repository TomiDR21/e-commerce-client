import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; 
// Create Context
export const CartContext = createContext();

// Create Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // ✅ Load cart from localStorage when the app starts
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // ✅ Save cart to localStorage every time it updates
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  

  const addToCart = (product) => {
    const productWithCartId = { ...product, cartId: uuidv4() }; // cartId único
    setCartItems((prevItems) => [...prevItems, productWithCartId]);
  };
  
  const removeFromCart = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };
  
  
  
  return (
    <CartContext.Provider value={{ cartItems, removeFromCart, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
