import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function parsePrice(price) {
  const num = parseFloat(price.replace(/[^\d.]/g, ""));
  return isNaN(num) ? 0 : num;
}

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    removeFromCart,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal
  } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Cart sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header" style={{
          background: "linear-gradient(135deg, #ff8c42 0%, #d35400 60%, #b33939 100%)",
          borderBottom: "2px solid #ffbd59",
          boxShadow: "0 4px 16px rgba(255, 140, 0, 0.10)"
        }}>
          <h2 style={{
            color: "#ffbd59",
            fontFamily: "'Playfair Display', 'Merriweather', serif",
            fontWeight: 900,
            letterSpacing: "1px",
            fontSize: "2rem",
            margin: 0
          }}>Your Cart</h2>
          <button
            className="close-cart"
            onClick={toggleCart}
            aria-label="Close cart"
            style={{
              color: "#ffbd59",
              background: "none",
              border: "none",
              borderRadius: "50%",
              padding: "6px",
              transition: "background 0.2s"
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-items" style={{
          background: "rgba(50, 25, 0, 0.92)",
          flex: 1,
          padding: "24px 20px"
        }}>
          {cartItems.length === 0 ? (
            <p className="empty-cart" style={{
              color: "#ffe4c4",
              fontFamily: "'Merriweather', serif",
              fontSize: "1.15rem",
              marginTop: "60px"
            }}>Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index} style={{
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(120deg, #ffbd59 0%, #ff8c42 100%)",
                borderRadius: "14px",
                marginBottom: "18px",
                boxShadow: "0 2px 12px rgba(255, 140, 0, 0.10)",
                padding: "10px 12px"
              }}>
                <div className="item-image" style={{
                  width: "62px",
                  height: "62px",
                  borderRadius: "10px",
                  backgroundImage: `url(${item.banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "2px solid #ffbd59",
                  boxShadow: "0 2px 8px #ffbd5940"
                }}></div>
                <div className="item-details" style={{
                  flex: 1,
                  padding: "0 18px"
                }}>
                  <h3 style={{
                    margin: "0 0 4px 0",
                    fontSize: "1.08rem",
                    color: "#b33939",
                    fontFamily: "'Merriweather', serif",
                    fontWeight: 700,
                    letterSpacing: "0.5px"
                  }}>{item.title}</h3>
                  <p className="item-price" style={{
                    margin: 0,
                    color: "#924302",
                    fontWeight: 600,
                    fontFamily: "'Merriweather', serif"
                  }}>{item.price}</p>
<div className="quantity-control">
  <button
    className="qty-btn"
    onClick={() => decreaseQuantity(index)}
    aria-label="Decrease quantity"
  >-</button>
  <span className="qty-value">{item.quantity || 1}</span>
  <button
    className="qty-btn"
    onClick={() => increaseQuantity(index)}
    aria-label="Increase quantity"
  >+</button>
</div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(index)}
                  aria-label="Remove item"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#b33939",
                    cursor: "pointer",
                    borderRadius: "50%",
                    padding: "6px",
                    transition: "background 0.2s"
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer" style={{
            background: "linear-gradient(135deg, #ff8c42 0%, #d35400 100%)",
            borderTop: "2px solid #ffbd59",
            padding: "22px 20px"
          }}>
            <div className="cart-total" style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1.18rem",
              color: "#fff5e1",
              fontFamily: "'Merriweather', serif",
              marginBottom: "18px"
            }}>
              <span>Total:</span>
              <span className="total-price" style={{
                fontWeight: 700,
                color: "#b33939",
                fontSize: "1.22rem"
              }}>{calculateTotal()}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                toggleCart();
                navigate("/checkout");
              }}
              style={{
                width: "100%",
                padding: "13px",
                background: "linear-gradient(135deg, #b33939 0%, #ff8c42 100%)",
                border: "none",
                borderRadius: "10px",
                color: "#fff5e1",
                fontWeight: 700,
                fontSize: "1.13rem",
                fontFamily: "'Merriweather', serif",
                cursor: "pointer",
                letterSpacing: "1px",
                boxShadow: "0 2px 8px #b3393940",
                transition: "background 0.2s, transform 0.2s"
              }}
            >Checkout</button>
          </div>
        )}
      </div>

      {/* Overlay that appears behind the cart when it's open */}
      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={toggleCart}
          style={{
            background: "rgba(50, 25, 0, 0.45)",
            backdropFilter: "blur(2px)"
          }}
        ></div>
      )}
    </>
  );
};

export default Cart;