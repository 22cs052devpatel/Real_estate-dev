import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./faq.scss";

const Faq = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I contact customer support?",
      answer: "You can contact our support team through the Contact Us page or by emailing support@example.com."
    },
    {
      question: "Where can I track my order?",
      answer: "You can track your order from the ‘My Orders’ section in your account or use the tracking link in the email confirmation."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in original packaging. Please visit our Returns page for more details."
    },
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking ‘Forgot Password’ on the login page and following the instructions sent to your email."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <span>{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
        <div className="faq-footer">
          <h3>Still have questions?</h3>
          <button onClick={() => navigate("/contact-us")}>Contact Support</button>
        </div>
      
      </div>
      <div className="background"></div>
    </div>
  );
};

export default Faq;
