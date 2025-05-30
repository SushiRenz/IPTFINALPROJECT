import React from "react";
import "./about.css";

const About = () => (
  <div className="about-bg">
    <div className="about-overlay">
      <div className="about-container">
        <h1 className="about-title">About Mrs. Bakers</h1>
        <p className="about-desc">
          <b>Mrs. Bakers</b> is a well-known restaurant and pastry shop located in Bayombong, Nueva Vizcaya. 
          With a passion for bringing families and friends together, Mrs. Bakers has become a beloved destination for locals and visitors alike. 
          Our menu features comforting homemade meals and delightful pastries, all crafted with love, tradition, and the finest ingredients.
          <br /><br />
          Over the years, Mrs. Bakers has earned a reputation for quality, warmth, and a taste that keeps people coming back. 
          Whether you’re dining in, taking out, or celebrating a special occasion, we are dedicated to making every experience memorable.
        </p>
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

export default About;