import React, { useEffect, useState } from "react";
import axios from "axios";
import "./menu.css";
import Navbar from "./navbar";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        // Only include products with category "menu"
        setMenuItems(res.data.filter(item => item.category === "menu"));
      })
      .catch(err => {
        setMenuItems([]);
        console.error("Failed to fetch menu:", err);
      });
  }, []);

  return (
    <div className="pastries-bg">
      <Navbar />
      <div className="pastries-list-section">
        <h2 className="pastries-list-title">Menu</h2>
        <div className="pastries-grid">
          {menuItems.map((item, idx) => (
            <div className="pastries-card" key={item._id || idx}>
              <img src={item.imageURL} alt={item.productName} className="pastries-img" />
              <div className="pastries-info">
                <h3>{item.productName}</h3>
                <p>{item.description}</p>
                <p style={{ fontWeight: 600, color: "#701D25" }}>₱{item.price}</p>
                {/* Optionally, display tags if you add them to your DB */}
                {/* {item.tags && (
                  <ul style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: 0, margin: "8px 0 0 0", listStyle: "none" }}>
                    {item.tags.map((tag, i) => (
                      <li key={i} style={{
                        background: "#f6ebd8",
                        color: "#701D25",
                        borderRadius: "6px",
                        padding: "2px 10px",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        marginBottom: 4,
                        border: "1px solid #f0e6d2"
                      }}>{tag}</li>
                    ))}
                  </ul>
                )} */}
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

export default Menu;