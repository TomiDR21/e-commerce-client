import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import SignUp from './pages/signup';
import Login from './pages/login';
import CartPage from './pages/cartpage';
import axios from 'axios';
import SuccessPage from './pages/successpage';
function App() {
  const [cartItems, setCartItems] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);

  const fetchCartItems = () => {
    axios
      .get('http://localhost:5000/cartitems')
      .then((response) => {
        // Update the cart quantity with the number of cart items
        setCartQuantity(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }

  useEffect(() => {
    // Fetch cart items when the component mounts and whenever cartQuantity changes
    fetchCartItems();
  }, [cartQuantity]);

  return (
    
    <div className="App"> {/* Add the App class to the root div */}
      <Router>
        <Routes>
          <Route path="/" element={<Homepage setCartItems={setCartItems} cartItems={cartItems} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} fetchCartItems={fetchCartItems}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cartPage" element={<CartPage setCartItems={setCartItems} cartItems={cartItems} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} fetchCartItems={fetchCartItems}/>} />
          <Route path="/successpage" element={<SuccessPage />} />
          
        </Routes> 
      </Router>
    </div>
  );
}

export default App;

