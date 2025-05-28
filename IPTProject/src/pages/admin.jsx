import axios from "axios";
import { useEffect } from "react";
import React, { useState } from "react";
import "./admin.css";

const API_URL = "http://localhost:5001/api/products"; // <-- Add here

const initialForm = {
  productID: "",
  productName: "",
  productType: "",
  price: "",
  stock: "",
  imageURL: "",
  description: ""
};

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        // Map backend fields to frontend fields
        const mapped = res.data.map(prod => ({
          productID: prod._id,
          productName: prod.name,
          productType: prod.category,
          price: prod.price,
          stock: prod.stock,
          imageURL: prod.imageUrl,
          description: prod.description,
        }));
        setProducts(mapped);
      })
      .catch(err => console.error("Error loading products:", err));
  }, []);
  
  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Replace the old handleSubmit with this:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.productName ||
      !form.productType ||
      !form.price ||
      !form.stock ||
      !form.imageURL
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editIndex === null) {
        // ADD
        const res = await axios.post(API_URL, {
          name: form.productName,
          price: form.price,
          stock: form.stock,
          description: form.description,
          category: form.productType,
          imageUrl: form.imageURL,
        });
        const newProduct = {
          productID: res.data._id,
          productName: res.data.name,
          productType: res.data.category,
          price: res.data.price,
          stock: res.data.stock,
          imageURL: res.data.imageUrl,
          description: res.data.description,
        };
        setProducts([...products, newProduct]);
      } else {
        // UPDATE
        const productToUpdate = products[editIndex];
        const res = await axios.put(`${API_URL}/${productToUpdate.productID}`, {
          name: form.productName,
          price: form.price,
          stock: form.stock,
          description: form.description,
          category: form.productType,
          imageUrl: form.imageURL,
        });
        const updatedProduct = {
          productID: res.data._id,
          productName: res.data.name,
          productType: res.data.category,
          price: res.data.price,
          stock: res.data.stock,
          imageURL: res.data.imageUrl,
          description: res.data.description,
        };
        const updatedProducts = [...products];
        updatedProducts[editIndex] = updatedProduct;
        setProducts(updatedProducts);
      }

      setForm(initialForm);
      setEditIndex(null);
    } catch (error) {
      console.error("Failed to submit product:", error);
      alert("Error submitting product.");
    }
  };

  // Edit product
  const handleEdit = (idx) => {
    setForm(products[idx]);
    setEditIndex(idx);
  };

  // Replace the old handleDelete with this:
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
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Product Management</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-fields">
          <input
            name="productID"
            placeholder="Product ID"
            value={form.productID}
            onChange={handleChange}
            required
          />
          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            required
          />
          <input
            name="productType"
            placeholder="Product Type"
            value={form.productType}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            type="number"
            min="0"
          />
          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
            type="number"
            min="0"
          />
          <input
            name="imageURL"
            placeholder="Image URL"
            value={form.imageURL}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">
          {editIndex === null ? "Add Product" : "Update Product"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setEditIndex(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>No products yet.</td>
            </tr>
          ) : (
            products.map((prod, idx) => (
              <tr key={prod.productID}>
                <td>{prod.productID}</td>
                <td>{prod.productName}</td>
                <td>{prod.productType}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td>
                  <img src={prod.imageURL} alt={prod.productName} />
                </td>
                <td>{prod.description}</td>
                <td>
                  <button onClick={() => handleEdit(idx)}>Edit</button>
                  <button onClick={() => handleDelete(idx)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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