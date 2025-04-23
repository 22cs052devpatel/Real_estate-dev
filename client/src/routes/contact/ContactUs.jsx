import React, { useState } from "react";
import "./contactus.scss";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);  // Log the error for debugging
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="contact-us-container">
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>Contact Us</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="background"></div>

      {isSuccess !== null && (
        <div className={`notification ${isSuccess ? "success" : "error"}`}>
          {isSuccess ? "Message sent successfully!" : "Error sending message"}
        </div>
      )}
    </div>
  );
};

export default ContactUs;
