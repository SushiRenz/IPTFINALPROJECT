import React from 'react';
import Navbar from "./navbar";
import './dashboard.css';
import { useCart } from './CartContext';

const featuredMeals = [
  {
    name: "Premium Jasmine Rice",
    desc: "Soft, aromatic, perfect for everyday meals.",
    img: "https://www.hungrylankan.com/wp-content/uploads/2024/10/Instant-pot-jasmine-rice-768x1024.jpg.webp"
  },
  {
    name: "Kanto-Style Garlic Fried Rice Pack",
    desc: "Vacuum-sealed and microwaveable, made for busy Filipino gamers/students.",
    img: "https://i0.wp.com/iankewks.com/wp-content/uploads/2023/06/IMG_1611.jpg?resize=800%2C1055&ssl=1"
  },
  {
    name: "Toyo-Mansi Rice Bombs",
    desc: "Sticky rice balls infused with soy sauce and calamansi. Iconic, portable.",
    img: "https://nomadette.com/wp-content/uploads/2023/03/Kimchi-Fried-Rice-Balls-Jumeok-Bap.jpg"
  }
];

const Dashboard = () => {
  const { currentUser } = useCart();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <div className="dashboard-hero">
          <div className="hero-content">
            <h1>
              Welcome to <span className="sinaing-logo">Sinaing Express</span>
              {currentUser && currentUser.username ? `, ${currentUser.username}` : ""}
            </h1>
            <p className="hero-tagline">
              Your online takeout for all things rice! Enjoy Filipino favorites and rice bowls, hot and fresh, delivered to your door.
            </p>
            <a href="/rice" className="btn hero-btn">Browse Rice Meals</a>
          </div>
          <div className="hero-image">
            <img src="https://www.maggi.ph/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/bfdc4aabaa491807618e7303c20723c6.jpg?h=476030cb&itok=32TzQ7Pc" alt="Rice Bowl" />
          </div>
        </div>

        <div className="featured-section">
          <h2 className="featured-title">Best Sellers</h2>
          <div className="meals-grid">
            {featuredMeals.map((meal, idx) => (
              <div className="meal-card" key={idx}>
                <img src={meal.img} alt={meal.name} className="meal-img" />
                <div className="meal-info">
                  <h3>{meal.name}</h3>
                  <p>{meal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <div className="footer-content">
          <span role="img" aria-label="rice">🍚</span>
          <span style={{ margin: '0 8px', fontWeight: 500 }}>Sinaing Express</span>
          <span style={{ color: '#ffbd59', margin: '0 8px' }}>|</span>
          <span style={{ fontSize: '0.95rem' }}>Delivering warmth, one pot at a time.</span>
          <span style={{ float: 'right', fontSize: '0.9rem', color: '#ffddaa', marginLeft: 'auto' }}>
            &copy; {new Date().getFullYear()} Sinaing Express
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;