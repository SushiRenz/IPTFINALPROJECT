import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Login.css';
import ImageLogo from '/public/assets/sel2.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useCart();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        login({ username: data.username });
        setLoginSuccess(true);
        setTimeout(() => {
          if (data.username === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1200);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapsLock = (e) => {
    setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="login-container">
          <div className="login-card">
            <img
              src={ImageLogo}
              alt="Mrs. Bakers Logo"
              className="Image-logo"
              style={{ width: '500px', height: 'auto', marginBottom: '12px' }}
            />
            <p className="tag-tagline">log in to Mrs. Bakers</p>
            {loginSuccess && (
              <div style={{
                color: '#4caf50',
                marginBottom: '10px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Login successful! Redirecting...
              </div>
            )}
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    paddingRight: '2.5rem',
                    boxSizing: 'border-box'
                  }}
                  onKeyUp={handleCapsLock}
                  onKeyDown={handleCapsLock}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#701D25',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    userSelect: 'none',
                    zIndex: 2
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                  role="button"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#701D25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.13" />
                      <path d="M1 1l22 22" />
                      <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03" />
                      <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.63 0-1.22.18-1.72.49" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#701D25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="12" rx="9" ry="7" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
                {capsLockOn && (
                  <div style={{
                    color: '#e57373',
                    fontSize: '0.85rem',
                    position: 'absolute',
                    left: 0,
                    top: '100%',
                    marginTop: '2px'
                  }}>
                    Caps Lock is ON
                  </div>
                )}
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            <p className="signup-text">
              New to Mrs. Bakers? <Link to="/signup">Sign up</Link>
            </p>
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

export default Login;
