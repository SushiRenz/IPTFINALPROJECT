import React from 'react';
import Navbar from "./navbar";
import './bigas.css';
import { useCart } from "./CartContext"; // <-- Add this import

const riceProducts = [
  {
    name: "Premium Jasmine Rice",
    description: "Soft, fragrant, and perfect for everyday meals.",
    price: "₱60 / kg",
    image: "https://m.media-amazon.com/images/I/71pohnZXCmL._SL1500_.jpg"
  },
  {
    name: "Dinorado Rice",
    description: "Locally loved for its aroma and slightly sticky texture.",
    price: "₱55 / kg",
    image: "https://sunnywoodrice.com/wp-content/uploads/2018/05/Farmboy-Dinorado-2020-10kg-01.jpg"
  },
  {
    name: "Sinandomeng Rice",
    description: "Classic Filipino rice, fluffy and versatile.",
    price: "₱50 / kg",
    image: "https://evegrocer.com/cdn/shop/products/1444078695-1602_6e249bdd-90c3-4f1d-95c1-710962beb5c4_1024x1024@2x.jpg?v=1588589172"
  },
  {
    name: "Brown Rice",
    description: "Healthy, whole grain rice with a nutty flavor.",
    price: "₱70 / kg",
    image: "https://www.harrisfarm.com.au/cdn/shop/products/11081-done.jpg?v=1575927486"
  },
  {
    name: "Red Rice",
    description: "Rich in fiber and nutrients, with a unique taste.",
    price: "₱75 / kg",
    image: "https://down-ph.img.susercontent.com/file/b3f7eb7ae6fe4c37788bcd2daf981ff5"
  },
  {
    name: "Black Rice",
    description: "High in antioxidants, with a deep, earthy flavor.",
    price: "₱80 / kg",
    image: "https://i.ebayimg.com/images/g/HukAAOSwaxNkwd6S/s-l1000.jpg"
  },
  {
    name: "Sticky Rice",
    description: "Perfect for kakanin and desserts, glutinous and soft.",
    price: "₱65 / kg",
    image: "https://pinoygroseri.com/cdn/shop/files/20250107-134242_1200x.jpg?v=1736275470"
  },
  {
    name: "Organic Brown Rice",
    description: "Grown without chemicals, healthy and flavorful.",
    price: "₱85 / kg",
    image: "https://img.lazcdn.com/g/p/mdc/773143364100007e21acc21564fceffe.jpg_720x720q80.jpg"
  },
  {
    name: "Well-Milled Rice",
    description: "Affordable and ideal for everyday meals.",
    price: "₱45 / kg",
    image: "https://down-ph.img.susercontent.com/file/ph-11134207-7qukw-ljcnenuq23q406"
  },
  {
    name: "Long Grain Rice",
    description: "Fluffy and non-sticky, great for fried rice.",
    price: "₱58 / kg",
    image: "https://www.webstaurantstore.com/images/products/large/170440/2685346.jpg"
  },
  {
    name: "Short Grain Rice",
    description: "Sticky and plump, perfect for sushi and paella.",
    price: "₱62 / kg",
    image: "https://m.media-amazon.com/images/I/71gBPSKknSL._AC_UF894,1000_QL80_.jpg"
  },
  {
    name: "Parboiled Rice",
    description: "Nutritious and less sticky, holds shape after cooking.",
    price: "₱68 / kg",
    image: "https://thesashopireland.com/wp-content/uploads/2025/01/IMG_7503.jpeg"
  }
];

const Bigas = () => {
  const { addToCart, openCartSidebar } = useCart(); // <-- Use the cart context

  // Helper to convert riceProducts item to cart item format
  const handleAddToCart = (rice) => {
    const cartItem = {
      title: rice.name,
      price: rice.price,
      banner: rice.image
    };
    addToCart(cartItem);
    if (typeof openCartSidebar === "function") {
      openCartSidebar();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bigas-list-section">
        <h2 className="bigas-list-title">Available Rice Varieties</h2>
        <div className="bigas-grid">
          {riceProducts.map((rice, idx) => (
            <div className="bigas-card" key={idx}>
              <img src={rice.image} alt={rice.name} className="bigas-img" />
              <div className="bigas-info">
                <h3>{rice.name}</h3>
                <p>{rice.description}</p>
                <div className="bigas-price">{rice.price}</div>
                <button
                  className="bigas-btn"
                  onClick={() => handleAddToCart(rice)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bigas;