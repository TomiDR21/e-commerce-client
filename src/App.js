import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer';
import Homepage from './pages/homepage';
import SignUp from './pages/signup';
import Login from './pages/login';
// import CheckoutPage from './pages/CheckoutPage';
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

