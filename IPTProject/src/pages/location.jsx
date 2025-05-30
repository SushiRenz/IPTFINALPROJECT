import React, { useState } from "react";
import "./location.css";
import bplace from "../assets/bplace.jpg"; // Import your image

const Location = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="location-container">
      <div className="location-card">
        <div className="location-left">
          <h2 className="location-title">Our Location</h2>
          <div className="location-image">
            <img
              src={bplace}
              alt="Mrs. Baker's Nueva Vizcaya"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="location-info">
          <h3>Visit Us</h3>
          <p>
            Mrs. Baker's<br />
            Maharlika Highway,<br />
            Bayombong, Nueva Vizcaya, Philippines
          </p>
          <div className="location-map">
            <iframe
              title="Mrs. Baker's Map"
              src="https://www.google.com/maps?q=Mrs.+Baker's,+Maharlika+Highway,+Bayombong,+Nueva+Vizcaya,+Philippines&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={bplace} alt="Mrs. Baker's Nueva Vizcaya Large" />
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;