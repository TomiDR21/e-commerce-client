import React, { useState } from "react";
import styles from "./css/productcard.module.css";

const ProductCard = ({ products }) => {
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last product on the current page
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  // Function to handle "Next" button
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle "Previous" button
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (

    
    <div className={styles.productCardContainer}>
      <div className={styles.productGrid}>
        {currentProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <h4>{product.name}</h4>
            <div>{product.description}</div>
            <div>${product.price}</div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.prevButton}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={styles.nextButton}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

