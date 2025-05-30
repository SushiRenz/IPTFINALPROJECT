import React from 'react';
import Navbar from "./navbar";
import './dashboard.css';
import { useCart } from './CartContext';
import p1 from '../assets/p1.png'; // Add this import at the top
import p2 from '../assets/p2.png'; // Add this line

const Dashboard = () => {
  const { currentUser } = useCart();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="dashboard-hero">
          <div className="hero-content">
            <h1>
              Welcome to Mrs. Bakers
            </h1>
            <p className="hero-tagline">
              Bringing families together with every bite—enjoy comforting homemade meals and pastries, made with love and tradition.
            </p>
            <div className="hero-details">
              <span>We're open for dine-in, reservations, takeout &amp; pick-up.</span>
              <span>9AM-8PM Tue-Sun</span>
              <span>Proud Taste You Just Want to Come Back For</span>
            </div>
            <div className="hero-actions">
              <a href="/menu" className="btn hero-btn">Check Menu</a>
              <a
                href="https://www.facebook.com/Mrs.Bakers/videos/1593533780664455"
                className="btn hero-btn"
                style={{ background: '#fff', color: '#701D25', border: '2px solid #701D25', boxShadow: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ marginRight: 8, fontSize: 18, verticalAlign: 'middle' }}>▶</span>
                Watch Video
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={p1}
              alt="Rice Bowl"
            />
          </div>
        </div>
      </div>
     <footer className="login-footer">
        <div className="footer-content">
          <span role="img" aria-label="rice"></span>
          <span style={{ margin: '0 8px', fontWeight: 500 }}>Mrs. Bakers</span>
          <span style={{ color: '#ffbd59', margin: '0 8px' }}>|</span>
          <span style={{ fontSize: '0.95rem' }}>Restaurant & Pastry Shop</span>
          <span style={{ float: 'right', fontSize: '0.9rem', color: '#ffddaa', marginLeft: 'auto' }}>
            &copy; {new Date().getFullYear()} Mrs. Bakers
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;