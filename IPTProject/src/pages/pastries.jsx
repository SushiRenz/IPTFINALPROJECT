import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import './pastries.css';
import axios from "axios";

const Pastries = () => {
  const [pastryItems, setPastryItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        // Only include products with category "pastries"
        setPastryItems(res.data.filter(item => item.category === "pastries"));
      })
      .catch(err => {
        setPastryItems([]);
        console.error("Failed to fetch pastries:", err);
      });
  }, []);

  return (
    <div className="pastries-bg">
      <Navbar />
      <div className="pastries-list-section">
        <h2 className="pastries-list-title">Freshly Baked Pastries</h2>
        <div className="pastries-grid">
          {pastryItems.map((item, idx) => (
            <div className="pastries-card" key={item._id || idx}>
              <img src={item.imageURL} alt={item.productName} className="pastries-img" />
              <div className="pastries-info">
                <h3>{item.productName}</h3>
                <p>{item.description}</p>
                <p style={{ fontWeight: 600, color: "#701D25" }}>₱{item.price}</p>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Pastries;