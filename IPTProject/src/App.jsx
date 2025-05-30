import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from './pages/dashboard';
import Menu from './pages/menu'; 
import Pastries from './pages/pastries';
import Navbar from './pages/navbar';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Admin from './pages/admin';
import About from './pages/about';
import Location from './pages/location';
import { CartProvider } from './pages/CartContext';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Cart />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pastries" element={<Pastries />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
         <Route path="/about" element={<About />} />
         <Route path="/location" element={<Location />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;