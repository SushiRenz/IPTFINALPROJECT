import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const API_URL = "http://localhost:5000/api/products";
const USERS_URL = "http://localhost:5000/api/users";

const initialForm = {
  productID: "",
  productName: "",
  price: "",
  imageURL: "",
  description: "",
  category: "menu"
};

const initialUserForm = {
  userID: "",
  username: "",
  email: "",
  password: ""
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuProducts, setMenuProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showModal, setShowModal] = useState(false);

  // User state
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState(initialUserForm);
  const [userEditIndex, setUserEditIndex] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [plainPasswords, setPlainPasswords] = useState({}); // userID: plain password
  const [showUserPassword, setShowUserPassword] = useState(false); // <-- New state for password visibility

  // Error states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Fetch products and users
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setMenuProducts(res.data.map(prod => ({
        productID: prod._id,
        productName: prod.productName,
        price: prod.price,
        imageURL: prod.imageURL,
        description: prod.description,
        category: prod.category
      }))))
      .catch(err => console.error("Error loading menu:", err));
    axios.get(USERS_URL)
      .then(res => setUsers(res.data.map(u => ({
        userID: u._id,
        username: u.username,
        email: u.email,
        password: "" // Don't show encrypted password
      }))))

      .catch(err => console.error("Error loading users:", err));
  }, []);

  const products = menuProducts;
  const setProducts = setMenuProducts;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imageURL: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName || !form.price || !form.imageURL) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editIndex === null) {
        // ADD
        const res = await axios.post(API_URL, {
          productName: form.productName,
          price: form.price,
          description: form.description,
          imageURL: form.imageURL,
          category: form.category,
        });
        const newProduct = {
          productID: res.data._id,
          productName: res.data.productName,
          price: res.data.price,
          imageURL: res.data.imageURL,
          description: res.data.description,
          category: res.data.category
        };
        setProducts([...products, newProduct]);
        alert("Product added successfully!"); // <-- Add this line
      } else {
        // UPDATE
        const productToUpdate = products[editIndex];
        const res = await axios.put(`${API_URL}/${productToUpdate.productID}`, {
          productName: form.productName,
          price: form.price,
          description: form.description,
          imageURL: form.imageURL,
          category: form.category,
        });
        const updatedProduct = {
          productID: res.data._id,
          productName: res.data.productName,
          price: res.data.price,
          imageURL: res.data.imageURL,
          description: res.data.description,
          category: res.data.category
        };
        const updatedProducts = [...products];
        updatedProducts[editIndex] = updatedProduct;
        setProducts(updatedProducts);
        alert("Product updated successfully!"); // <-- Add this line
      }

      setForm(initialForm);
      setEditIndex(null);
      setImagePreview("");
    } catch (error) {
      console.error("Failed to submit product:", error);
      alert("Error submitting product.");
    }
  };

  const handleEdit = (idx) => {
    setForm(products[idx]);
    setEditIndex(idx);
    setImagePreview(products[idx].imageURL);
  };

  const handleDelete = async (idx) => {
    const product = products[idx];
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${API_URL}/${product.productID}`);
        const updated = [...products];
        updated.splice(idx, 1);
        setProducts(updated);
        if (editIndex === idx) {
          setForm(initialForm);
          setEditIndex(null);
          setImagePreview("");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete.");
      }
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditIndex(null);
    setImagePreview("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/");
    }
  };

  // --- User Handlers ---
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });

    // Username validation
    if (name === "username") {
      if (!validateUsername(value)) {
        setUsernameError("Username can only contain letters, numbers, and underscores.");
      } else {
        setUsernameError("");
      }
    }

  // Password validation
  if (name === "password") {
    if (!isStrongPassword(value)) {
      setPasswordError("Min 8 chars, upper, lower, number & symbol.");
    } else {
      setPasswordError("");
    }
  }
  };

  // Username validation: only letters, numbers, underscores
  const validateUsername = (username) => /^[a-zA-Z0-9_]+$/.test(username);

  // Password strength checker
  const isStrongPassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    // Validate before submit
    let hasError = false;
    if (!userForm.username || !userForm.email || !userForm.password) {
      setUsernameError(!userForm.username ? "Username is required." : "");
      setPasswordError(!userForm.password ? "Password is required." : "");
      hasError = true;
    }
    if (!validateUsername(userForm.username)) {
      setUsernameError("Username can only contain letters, numbers, and underscores.");
      hasError = true;
    }
    if (!isStrongPassword(userForm.password)) {
      setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      hasError = true;
    }
    if (hasError) return;

    try {
      if (userEditIndex === null) {
        // ADD
        const res = await axios.post(USERS_URL, {
          username: userForm.username,
          email: userForm.email,
          password: userForm.password
        });
        const newUser = {
          userID: res.data._id,
          username: res.data.username,
          email: res.data.email,
          password: userForm.password // Store plain password for display
        };
        setUsers([...users, newUser]);
        setPlainPasswords(prev => ({ ...prev, [res.data._id]: userForm.password }));
        setUsernameError("");
        setPasswordError("");
      } else {
        // UPDATE
        const userToUpdate = users[userEditIndex];
        const res = await axios.put(`${USERS_URL}/${userToUpdate.userID}`, {
          username: userForm.username,
          email: userForm.email,
          password: userForm.password
        });
        const updatedUser = {
          userID: res.data._id,
          username: res.data.username,
          email: res.data.email,
          password: userForm.password // Store plain password for display
        };
        const updatedUsers = [...users];
        updatedUsers[userEditIndex] = updatedUser;
        setUsers(updatedUsers);
        setPlainPasswords(prev => ({ ...prev, [res.data._id]: userForm.password }));
        setUsernameError("");
        setPasswordError("");
      }
      setUserForm(initialUserForm);
      setUserEditIndex(null);
    } catch (error) {
      setPasswordError("Error submitting user.");
    }
  };

  // When editing, show the plain password if available
  const handleUserEdit = (idx) => {
    const user = users[idx];
    setUserForm({
      ...user,
      password: "*******"
    });
    setUserEditIndex(idx);
    setShowUserModal(false);
  };

  const handleUserDelete = async (idx) => {
    const user = users[idx];
    if (window.confirm("Delete this user?")) {
      try {
        await axios.delete(`${USERS_URL}/${user.userID}`);
        const updated = [...users];
        updated.splice(idx, 1);
        setUsers(updated);
        if (userEditIndex === idx) {
          setUserForm(initialUserForm);
          setUserEditIndex(null);
        }
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  const handleUserCancel = () => {
    setUserForm(initialUserForm);
    setUserEditIndex(null);
  };

  // --- Tab Button ---
  const tabBtn = (tab, label) => (
    <button
      className={activeTab === tab ? "admin-tab active" : "admin-tab"}
      type="button"
      onClick={() => {
        setActiveTab(tab);
        setForm(initialForm);
        setEditIndex(null);
        setImagePreview("");
        setUserForm(initialUserForm);
        setUserEditIndex(null);
      }}
      style={{
        marginBottom: "-2px",
        borderBottom: activeTab === tab ? "2px solid #fff" : "2px solid #701D25"
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="admin-container" style={{ maxWidth: 540, position: "relative" }}>
      {/* Logout Icon Button */}
      <button
        className="admin-logout-btn"
        onClick={handleLogout}
        title="Logout"
        type="button"
        style={{
          position: "absolute",
          top: 18,
          right: 22,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 20
        }}
        aria-label="Logout"
      >
        <svg className="user-icon" viewBox="0 0 24 24" fill="none" width="32" height="32">
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
      </button>

      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, justifyContent: "center" }}>
        {tabBtn("menu", "Menu")}
        {tabBtn("users", "Users")}
      </div>

      {/* --- MENU TAB --- */}
      {activeTab === "menu" && (
        <>
          <h2 className="admin-title" style={{ marginBottom: 18 }}>
            {editIndex === null
              ? `Add New Menu Item`
              : `Edit Menu Item`}
          </h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>Product Image*</label>
            <div
              className="image-upload-area"
              onClick={() => document.getElementById("image-upload").click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <>
                  <span>📷</span>
                  <div>
                    <span style={{ color: "#701D25", fontWeight: 600 }}>
                      Click to upload or drag and drop
                    </span>
                    <br />
                    <span style={{ color: "#a08b6f" }}>
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </div>
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <label htmlFor="productName">Product Name*</label>
            <input
              id="productName"
              name="productName"
              placeholder="Product Name*"
              value={form.productName}
              onChange={handleChange}
              required
            />
            <label htmlFor="price">Price*</label>
            <input
              id="price"
              name="price"
              placeholder="Price*"
              value={form.price}
              onChange={handleChange}
              required
              type="number"
              min="0"
            />
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="menu">Menu</option>
              <option value="pastries">Pastries</option>
            </select>
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description (Optional)"
              value={form.description}
              onChange={handleChange}
            />
            <div className="button-row" style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "8px" }}>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">
                {editIndex === null ? "ADD PRODUCT" : "UPDATE PRODUCT"}
              </button>
              <button
                type="button"
                style={{
                  background: "#fff",
                  color: "#701D25",
                  border: "2px solid #701D25",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #701D2520"
                }}
                onClick={() => setShowModal(true)}
              >
                Products
              </button>
            </div>
          </form>
          {/* Modal for Product Table */}
          {showModal && (
            <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
              <div className="admin-modal" onClick={e => e.stopPropagation()}>
                <button
                  className="admin-modal-close"
                  onClick={() => setShowModal(false)}
                  title="Close"
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 22,
                    background: "none",
                    border: "none",
                    fontSize: "1.7rem",
                    color: "#701D25",
                    cursor: "pointer",
                    fontWeight: "bold",
                    zIndex: 10
                  }}
                >
                  &times;
                </button>
                <h3 style={{ marginTop: 0, marginBottom: 18, color: "#701D25", textAlign: "center" }}>
                  Menu & Pastries List
                </h3>
                <div className="admin-modal-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th style={{ minWidth: 110 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>No products yet.</td>
                        </tr>
                      ) : (
                        products.map((prod, idx) => (
                          <tr key={prod.productID}>
                            <td>
                              <img src={prod.imageURL} alt={prod.productName} />
                            </td>
                            <td>{prod.productName}</td>
                            <td>{prod.price}</td>
                            <td>{prod.category}</td>
                            <td>{prod.description}</td>
                            <td>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                  style={{
                                    background: "#701D25",
                                    color: "#fff",
                                    border: "none",
                                    padding: "7px 16px",
                                    borderRadius: "6px",
                                    fontSize: "0.97rem",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif",
                                    transition: "background 0.2s, transform 0.2s"
                                  }}
                                  onClick={() => { handleEdit(idx); setShowModal(false); }}
                                >
                                  Edit
                                </button>
                                <button
                                  style={{
                                    background: "#a02c36",
                                    color: "#fff",
                                    border: "none",
                                    padding: "7px 16px",
                                    borderRadius: "6px",
                                    fontSize: "0.97rem",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif",
                                    transition: "background 0.2s, transform 0.2s"
                                  }}
                                  onClick={() => handleDelete(idx)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* --- USERS TAB --- */}
      {activeTab === "users" && (
        <>
          <h2 className="admin-title" style={{ marginBottom: 18 }}>
            {userEditIndex === null ? "Add New User" : "Edit User"}
          </h2>
          <form className="admin-form" onSubmit={handleUserSubmit}>
            <label htmlFor="username">Username*</label>
            <input
              id="username"
              name="username"
              placeholder="Username*"
              value={userForm.username}
              onChange={handleUserChange}
              required
              style={{
                borderColor: usernameError ? "#d32f2f" : undefined,
                background: usernameError ? "#fff0f0" : undefined
              }}
            />
            {usernameError && (
              <div style={{ color: "#d32f2f", fontSize: "0.95em", marginBottom: 6 }}>
                {usernameError}
              </div>
            )}
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              placeholder="Email*"
              value={userForm.email}
              onChange={handleUserChange}
              required
              type="email"
            />
            <label htmlFor="password">Password*</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="password"
                name="password"
                placeholder="Password*"
                value={userForm.password}
                onChange={handleUserChange}
                required
                type={showUserPassword ? "text" : "password"}
                style={{
                  borderColor: passwordError ? "#d32f2f" : undefined,
                  background: passwordError ? "#fff0f0" : undefined,
                  width: "100%",
                  paddingRight: "2.5rem",
                  boxSizing: "border-box"
                }}
              />
              <span
                onClick={() => setShowUserPassword((prev) => !prev)}
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
                aria-label={showUserPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
                role="button"
              >
                {showUserPassword ? (
                  // Eye-off SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#701D25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.13"/>
                    <path d="M1 1l22 22"/>
                    <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/>
                    <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.63 0-1.22.18-1.72.49"/>
                  </svg>
                ) : (
                  // Eye SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#701D25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="9" ry="7"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
            </div>
            {passwordError && (
              <div style={{ color: "#d32f2f", fontSize: "0.95em", marginBottom: 6 }}>
                {passwordError}
              </div>
            )}
            <div className="button-row" style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "8px" }}>
              <button type="button" onClick={handleUserCancel}>
                Cancel
              </button>
              <button type="submit">
                {userEditIndex === null ? "ADD USER" : "UPDATE USER"}
              </button>
              <button
                type="button"
                style={{
                  background: "#fff",
                  color: "#701D25",
                  border: "2px solid #701D25",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #701D2520"
                }}
                onClick={() => setShowUserModal(true)}
              >
                Users
              </button>
            </div>
          </form>
          {/* Modal for User Table */}
          {showUserModal && (
            <div className="admin-modal-overlay" onClick={() => setShowUserModal(false)}>
              <div className="admin-modal" onClick={e => e.stopPropagation()}>
                <button className="admin-modal-close" onClick={() => setShowUserModal(false)} title="Close">&times;</button>
                <h3 style={{ marginTop: 0, marginBottom: 18, color: "#701D25", textAlign: "center" }}>
                  Users List
                </h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th style={{ minWidth: 110 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>No users yet.</td>
                      </tr>
                    ) : (
                      users.map((user, idx) => (
                        <tr key={user.userID}>
                          <td>{user.userID}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{"******"}</td>
                          <td>
                            <button onClick={() => { handleUserEdit(idx); setShowUserModal(false); }}>Edit</button>
                            <button onClick={() => handleUserDelete(idx)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;

//eggss

// Simple Base64 encode/decode for demonstration
function encryptID(id) {
  return btoa(id);
}
function decryptID(enc) {
  try {
    return atob(enc);
  } catch {
    return enc;
  }
}