import React, { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import Nav from "../components/nav";
import axios from "axios";

const Homepage = ({ cartQuantity, setCartQuantity, fetchCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product_id, product_name) => {
    console.log("product_id:", product_id);
    console.log("product_name:", product_name);

    const data = {
      product_id,
      product_name,
    };

    axios
      .post("http://localhost:5000/cartitems", data)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        setCartQuantity(cartQuantity + 1);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  useEffect(() => {
    fetchCartItems(setCartQuantity);
  }, [fetchCartItems, setCartQuantity]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav setCartQuantity={setCartQuantity} cartQuantity={cartQuantity} />
      <ProductCard products={products} handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default Homepage;
