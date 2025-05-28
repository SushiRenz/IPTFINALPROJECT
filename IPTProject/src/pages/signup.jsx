import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Username validation: only letters, numbers, underscores
  const validateUsername = (username) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 8
    ) {
      return 'Strong';
    }
    return 'Medium';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      if (!validateUsername(value)) {
        setUsernameError('Username can only contain letters, numbers, and underscores.');
      } else {
        setUsernameError('');
      }
    }

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(formData.username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (passwordStrength === 'Weak') {
      alert('Password is too weak.');
      return;
    }

    setIsLoading(true);

    try {
      // Updated API endpoint to match backend routes
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Account created successfully!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="signup-container">
          <p className="signup-tagline">Join your kanin journey!</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            {usernameError && <div className="signup-error">{usernameError}</div>}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            {/* Password field with show/hide */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
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
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#ffbd59',
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
                  // Eye-off SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffbd59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.13"/>
                    <path d="M1 1l22 22"/>
                    <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/>
                    <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.63 0-1.22.18-1.72.49"/>
                  </svg>
                ) : (
                  // Eye SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffbd59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="9" ry="7"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
            </div>
            {formData.password && (
              <div
                className="signup-strength"
                style={{
                  color:
                    passwordStrength === 'Strong'
                      ? 'green'
                      : passwordStrength === 'Medium'
                      ? 'orange'
                      : 'red'
                }}
              >
                Password strength: {passwordStrength}
              </div>
            )}
            {/* Confirm Password field with show/hide */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  paddingRight: '2.5rem',
                  boxSizing: 'border-box'
                }}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#ffbd59',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  userSelect: 'none',
                  zIndex: 2
                }}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
                role="button"
              >
                {showConfirmPassword ? (
                  // Eye-off SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffbd59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.13"/>
                    <path d="M1 1l22 22"/>
                    <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/>
                    <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.63 0-1.22.18-1.72.49"/>
                  </svg>
                ) : (
                  // Eye SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffbd59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="9" ry="7"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
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
}

export default SignUp;