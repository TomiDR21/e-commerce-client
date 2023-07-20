import React, { useEffect, useState } from 'react'
import axios from 'axios'

 const Homepage = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    // Make a GET request to the API endpoint
    axios.get('/products')
      .then(response => {
        // Update the 'products' state with the response data
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
          </li>
        )

      )}</ul>
    </div>
  )
}

export default Homepage