import React, { useState } from "react";
import "./rice.css";
import { useCart } from "./CartContext";

const menuItems = [
  {
    name: "Premium Jasmine Rice",
    price: "₱60.00",
    image: "https://www.hungrylankan.com/wp-content/uploads/2024/10/Instant-pot-jasmine-rice-768x1024.jpg.webp",
    description: "Soft, aromatic, and perfect for everyday meals. Served hot and fluffy.",
    tags: ["Rice", "Classic", "Steamed"]
  },
  {
    name: "Kanto-Style Garlic Fried Rice",
    price: "₱80.00",
    image: "https://i0.wp.com/iankewks.com/wp-content/uploads/2023/06/IMG_1611.jpg?resize=800%2C1055&ssl=1",
    description: "Vacuum-sealed, microwaveable, and loaded with garlic. Made for busy Filipino gamers and students.",
    tags: ["Garlic", "Fried Rice", "Savory"]
  },
  {
    name: "Toyo-Mansi Rice Bombs",
    price: "₱75.00",
    image: "https://nomadette.com/wp-content/uploads/2023/03/Kimchi-Fried-Rice-Balls-Jumeok-Bap.jpg",
    description: "Sticky rice balls infused with soy sauce and calamansi. Iconic and portable.",
    tags: ["Rice Balls", "Toyo-Mansi", "Snack"]
  },
  {
    name: "Nakset",
    price: "₱20.00",
    image: "https://i0.wp.com/twobittart.com/wp-content/uploads/2018/04/burnt-rice.jpg?resize=500%2C501&ssl=1",
    description: "Burnt to a crisp, exsquisite taste, and loaded with burnt taste. Good for your health.",
    tags: ["Authentic", "Rare", "Charred"]
  },
  {
    name: "Rice Crackers",
    price: "₱10.00",
    image: "https://www.maangchi.com/wp-content/uploads/2010/10/nurungji_disk.jpg",
    description: "Vacuum-sealed, microwaveable, and loaded with garlic. Made for busy Filipino gamers and students.",
    tags: ["Crunchy", "Literally Fried Rice", "Snack"]
  },
  {
    name: "Buro",
    price: "₱15.00",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF3rDnCb0T-yB3lt2siG6cH_GIcjQCzyaeLKmqjGh53W3d5G4QHS7wizQLloU0J-X3x9VwdY7W18iZMUgC6gr480wxpqZcMSzjgE8KXVZpM8a3LMK4ct34bFtlAhnjfvg2vhlmlTPW3O4/s1600/DSC_0011.JPG",
    description: "Vacuum-sealed, microwaveable, and loaded with garlic. Made for busy Filipino gamers and students.",
    tags: ["Icky", "Pungent", "Savory"]
  },
  {
    name: "Japanese Premium butil ng Kanin",
    price: "₱200.00",
    image: "https://www.treetopzencenter.org/wp-content/uploads/2024/05/gi-rice-chopsticks.jpg",
    description: "Vacuum-sealed, microwaveable, and loaded with garlic. Made for busy Filipino gamers and students.",
    tags: ["Ultra Rare", "Fuji Grown", "A5 of Rice"]
  }
];

const MenuCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(""); // "left" or "right" for animation
  const { addToCart, openCartSidebar } = useCart();

  const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
  const nextIndex = (currentIndex + 1) % menuItems.length;

  const handleNext = () => {
    setDirection("right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % menuItems.length);
      setDirection("");
    }, 350);
  };

  const handlePrev = () => {
    setDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      setDirection("");
    }, 350);
  };

  const handleOrder = () => {
    const item = menuItems[currentIndex];
    const cartItem = {
      title: item.name,
      price: item.price,
      banner: item.image
    };
    addToCart(cartItem);
    if (typeof openCartSidebar === "function") {
      openCartSidebar();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="menu-carousel-container">
          <button className="nav-btn left" onClick={handlePrev} aria-label="Previous">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="carousel">
            {/* Previous (shadow) */}
            <div
              className={`menu-card shadow-card left-card ${direction === "left" ? "slide-in-right" : direction === "right" ? "slide-out-left" : ""}`}
            >
              <img
                src={menuItems[prevIndex].image}
                alt=""
                className="shadow-img"
                draggable="false"
              />
            </div>
            {/* Current (main) */}
            <div
              className={`menu-card main-card ${direction === "left" ? "slide-in-center-from-left" : direction === "right" ? "slide-in-center-from-right" : ""}`}
            >
              <div className="overlay" />
              <div className="menu-details">
                <img src={menuItems[currentIndex].image} alt={menuItems[currentIndex].name} className="menu-img" />
                <h1>{menuItems[currentIndex].name}</h1>
                <span className="menu-price">{menuItems[currentIndex].price}</span>
                <p className="menu-description">{menuItems[currentIndex].description}</p>
                <ul className="menu-tags">
                  {menuItems[currentIndex].tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Next (shadow) */}
            <div
              className={`menu-card shadow-card right-card ${direction === "right" ? "slide-in-left" : direction === "left" ? "slide-out-right" : ""}`}
            >
              <img
                src={menuItems[nextIndex].image}
                alt=""
                className="shadow-img"
                draggable="false"
              />
            </div>
            {/* Cart button always below main card */}
            <button className="order-btn fixed-cart-btn" onClick={handleOrder}>
              <svg className="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6h15l-1.5 9h-13z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="21" r="1" fill="currentColor"/>
                <circle cx="18" cy="21" r="1" fill="currentColor"/>
              </svg>
              Order
            </button>
          </div>
          <button className="nav-btn right" onClick={handleNext} aria-label="Next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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

export default MenuCarousel;