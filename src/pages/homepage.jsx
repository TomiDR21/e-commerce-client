import React, { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import Nav from "../components/nav";
import axios from "axios";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  // CART--------------------------------------------------------

  const handleAddToCart = () => {
    const { id } = products;
    const data = {
      product_id: id,
      quantity: cartQuantity + 1,
    };

    axios
      .post("http://localhost:3000/cart", data)
      .then((response) => {
        console.log("Item added to cart:", response.data);
        setCartQuantity(cartQuantity + 1);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
    setCartQuantity(cartQuantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (cartQuantity > 0) {
      const { id } = products;
      const data = {
        product_id: id,
        quantity: cartQuantity - 1,
      };

      axios
        .post("http://localhost:3000/cart", data)
        .then((response) => {
          console.log("Item removed from cart:", response.data);
          setCartQuantity(cartQuantity - 1);
        })
        .catch((error) => {
          console.error("Error removing item from cart:", error);
        });
      setCartQuantity(cartQuantity - 1);
    }
  };

  //PRODUCTS----------------------------------------------------------------

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the 'products' state with the response data
        setProducts(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div>
      <Nav setCartQuantity={setCartQuantity} cartQuantity={cartQuantity}></Nav>
      <ProductCard
        products={products}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      ></ProductCard>
    </div>
  );
};

export default Homepage;
