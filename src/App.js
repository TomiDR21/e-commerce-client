import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer';
import Homepage from './pages/homepage';
import SignUp from './pages/signup';
import Login from './pages/login';
import UserProvider from './context/UserContext'; 
import { CartProvider } from "./context/CartContext";
import Cart from './pages/cartPage';
import Profile from './pages/profile';
import PurchasePage from './pages/purchasePage';
import MyPurchases from './pages/myPurchases';



// import CheckoutPage from './pages/CheckoutPage';
function App() {
  
  return (
    <CartProvider>  
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/mypurchases" element={<MyPurchases />} />
          </Routes>
        </Router>
      </UserProvider>
    </CartProvider>  
      );
}

export default App;

