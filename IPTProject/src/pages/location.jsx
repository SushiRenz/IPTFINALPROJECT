import React, { useState } from "react";
import "./location.css";
import bplace from "../assets/bplace.jpg";

const Location = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="location-page-bg">
      <div className="location-main-content">
        <h1 className="location-main-title">Our Location</h1>
        <p className="location-main-desc">
          Visit us at our main branch in Bayombong, Nueva Vizcaya. Enjoy our cozy atmosphere and delicious offerings in the heart of town!
        </p>
        <div className="location-map-section">
          <iframe
            title="Mrs. Baker's Map"
            src="https://www.google.com/maps?q=Mrs.+Baker's,+Maharlika+Highway,+Bayombong,+Nueva+Vizcaya,+Philippines&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: 14 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="location-info-row">
          <div className="location-info-block">
            <img
              src={bplace}
              alt="Mrs. Baker's Building"
              className="location-info-img"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            />
            <div className="location-info-label">Our Storefront</div>
          </div>
          <div className="location-info-block">
            <div className="location-info-title">Address</div>
            <div className="location-info-detail">
              Mrs. Baker's<br />
              Maharlika Highway,<br />
              Bayombong, Nueva Vizcaya, Philippines
            </div>
          </div>
          <div className="location-info-block">
            <div className="location-info-title">Contact Information</div>
            <div className="location-info-detail">
              <div>Phone: (078) 805 3262</div>
              <div>Email: info@mrsbakers.com</div>
              <div>Open Hours: 7:00 AM – 8:00 PM Daily</div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={bplace} alt="Mrs. Baker's Large" />
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </div>
      )}

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

export default Location;