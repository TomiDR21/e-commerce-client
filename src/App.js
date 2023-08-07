import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer';
import Homepage from './pages/homepage';
import SignUp from './pages/signup';
import Login from './pages/login';
import CartPage from './pages/cartpage';
import SuccessPage from './pages/successpage';
function App() {
  return (
    
    <div className="App"> {/* Add the App class to the root div */}
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/successpage" element={<SuccessPage />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;

