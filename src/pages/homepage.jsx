import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productcard';
 const Homepage = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch('http://localhost:5000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the 'products' state with the response data
        setProducts(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <ProductCard products={products}></ProductCard>
    </div>
  )
}

export default Homepage