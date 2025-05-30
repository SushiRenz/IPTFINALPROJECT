import React from "react";
import "./menu.css";
import Navbar from "./navbar";

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

const Menu = () => {
  return (
    <div className="pastries-bg">
      <Navbar />
      <div className="pastries-list-section">
        <h2 className="pastries-list-title">Menu</h2>
        <div className="pastries-grid">
          {menuItems.map((item, idx) => (
            <div className="pastries-card" key={idx}>
              <img src={item.image} alt={item.name} className="pastries-img" />
              <div className="pastries-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {/* Optionally, display tags */}
                {item.tags && (
                  <ul style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: 0, margin: "8px 0 0 0", listStyle: "none" }}>
                    {item.tags.map((tag, i) => (
                      <li key={i} style={{
                        background: "#f6ebd8",
                        color: "#701D25",
                        borderRadius: "6px",
                        padding: "2px 10px",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        marginBottom: 4,
                        border: "1px solid #f0e6d2"
                      }}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Menu;