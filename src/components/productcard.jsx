import React, { useState, useEffect, useContext } from "react";
import styles from "./css/productcard.module.css";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ products, loading }) => {
  const productsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  // Filtrar productos por nombre
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index of the first and last product on the current page
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode user info (if stored) - for now, just setting a placeholder
      const storedUser = JSON.parse(localStorage.getItem("user")) || {
        username: "User",
      };
      setUser(storedUser);
    }
  }, []);
  // Function to handle "Next" button
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
      setAnimationKey((prev) => prev + 1); // Forzar re-render para animación
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setAnimationKey((prev) => prev + 1); // Forzar re-render para animación
    }
  };

  const handleSearch = (e) => {
    setCurrentPage(1)
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.productCardContainer}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          <hr />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <div key={animationKey} className={styles.productGrid}>
            {filteredProducts.length === 0 ? (
              <p style={{ textAlign: "center", width: "100%" }}>
                No matches found.
              </p>
            ) : (
              currentProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`${styles.productItem} fadeInUp`}
                  style={{ animationDelay: `${i * 100}ms` }} // delay escalonado
                >
                  <img src={product.image} alt={product.image} />
                  <h4>{product.name}</h4>
                  <div>{product.description}</div>
                  <div>${product.price}</div>

                  {user ? (
                    <button
                      className={styles.addButton}
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <a href="http://localhost:3000/login">
                      Log in to start adding products
                    </a>
                  )}
                </div>
              ))
            )}
          </div>

          {filteredProducts.length > 0 && (
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
                disabled={
                  currentPage ===
                  Math.ceil(filteredProducts.length / productsPerPage)
                }
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;
