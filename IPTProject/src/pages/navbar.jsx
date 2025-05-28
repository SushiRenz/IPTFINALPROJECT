import React from 'react';
import './navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on login and signup pages
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) return null;

  // Logout handler with confirmation
  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/"); // Redirect to login/home
    }
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/pastries">Pastries</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/location">Location</Link></li>
        </ul>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Logout icon button */}
          <a 
            href="/" 
            onClick={handleLogout} 
            className="user-link" 
            aria-label="Logout"
          >
            <svg className="user-icon" viewBox="0 0 24 24" fill="none">
              <path 
                d="M16 17L21 12L16 7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M21 12H9" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
