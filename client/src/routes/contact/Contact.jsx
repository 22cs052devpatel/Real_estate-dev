import React from "react";
import { useNavigate } from "react-router-dom";
import "./contact.scss";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>How can we help you today?</h1>
        <p>Welcome to our Help Center</p>
        <div className="search-bar">
          <input type="text" placeholder="Search help articles" />
          <button>Search</button>
        </div>
      </div>

      <div className="contact-content">
        {/* Clicking on this will navigate to ContactUs.js */}
        <div className="contact-card" onClick={() => navigate("/contact-us")}>
          <img src="/support.svg" alt="Support" />
          <h2>Customer Support</h2>
          <p>Need help? Our support team is here to assist you with any queries.</p>
        </div>

        <div className="contact-card" onClick={() => navigate("/faq")}>
  <img src="/faq.png" alt="FAQ" />
  <h2>Frequently Asked Questions</h2>
  <p>Find answers to common questions in our FAQ section.</p>
</div>

      </div>
    </div>
  );
};

export default Contact;
    