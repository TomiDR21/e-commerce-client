import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productcard';
import Nav from '../components/nav';
 const Homepage = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:5000/products')
        
        
        if (!res.ok) 
          throw new Error('Failed to fetch products');
          const data = await res.json();
          setProducts(data)
      }
      
  
      catch (error) {
        console.error('Fetch error:', error);

      }
      finally{
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, []);  

  return (
    <div>
      <Nav></Nav>
      <ProductCard products={products} loading={loading}></ProductCard>
    </div>
  )
}

export default Homepage



