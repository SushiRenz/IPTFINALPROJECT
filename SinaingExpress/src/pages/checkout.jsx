import React, { useState } from "react";
import { useCart } from "./CartContext";
import "./checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart(); // Clear the cart after placing the order
    // Here you would send the order to your backend or process it
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <h2>Thank you for your order!</h2>
        <p>
          Your order will be sent by the rider on your doorstep soon. Thank you for patience!
        </p>
        <button className="checkout-btn" onClick={() => navigate("/dashboard")}>Back to Store</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty.</h2>
        <button className="checkout-btn" onClick={() => navigate("/dashboard")}>Back to Store</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-cart-items">
        {cartItems.map((item, idx) => (
          <div className="checkout-cart-item" key={idx}>
            <div
              className="checkout-item-image"
              style={{ backgroundImage: `url(${item.banner})` }}
            />
            <div className="checkout-item-details centered-details">
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <span>Total:</span>
        <span className="checkout-total">{calculateTotal()}</span>
      </div>
      <button
        className="checkout-btn"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;