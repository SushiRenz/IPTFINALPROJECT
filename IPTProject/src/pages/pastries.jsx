import React from 'react';
import Navbar from "./navbar";
import './pastries.css';

const pastryProducts = [
  {
    name: "Chocolate Croissant",
    description: "Flaky, buttery croissant filled with rich chocolate.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Strawberry Danish",
    description: "Sweet pastry topped with fresh strawberries and glaze.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cinnamon Roll",
    description: "Soft roll with cinnamon sugar and cream cheese icing.",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Blueberry Muffin",
    description: "Moist muffin bursting with blueberries.",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Macaron Box",
    description: "Assorted delicate French macarons (box of 6).",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Éclair",
    description: "Classic éclair with chocolate glaze and vanilla cream.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  }
];

const Pastries = () => {
  return (
    <div className="pastries-bg">
      <Navbar />
      <div className="pastries-list-section">
        <h2 className="pastries-list-title">Freshly Baked Pastries</h2>
        <div className="pastries-grid">
          {pastryProducts.map((pastry, idx) => (
            <div className="pastries-card" key={idx}>
              <img src={pastry.image} alt={pastry.name} className="pastries-img" />
              <div className="pastries-info">
                <h3>{pastry.name}</h3>
                <p>{pastry.description}</p>
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