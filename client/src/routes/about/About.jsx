import React from "react";
import { motion } from "framer-motion";
import "./about.scss";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

// Sample owners data with placeholder images
const owners = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    title: "Co-Founder & CTO",
    image: "https://via.placeholder.com/150",
  },
];

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <div className="about-text">
          {[
            "Welcome to our platform! We are dedicated to providing the best services to our users by leveraging cutting-edge technology and innovative design.",
            "Our mission is to enhance user experience, ensure seamless interactions, and continuously improve our offerings.",
            "We value your feedback and are always open to suggestions. Feel free to reach out to us for any inquiries or collaborations. Let's build something amazing together!",
          ].map((text, index) => (
            <motion.p
              key={index}
              custom={index}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {text}
            </motion.p>
          ))}
        </div>
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src="/about_img.webp" alt="About Us" />
        </motion.div>
      </div>

      {/* Owners Section */}
      <div className="owners-section">
        <h2>Meet Our Team</h2>
        <div className="owners-container">
          {owners.map((owner, index) => (
            <motion.div
              key={index}
              className="owner-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
            >
              <img src={owner.image} alt={owner.name} />    
              <h3>{owner.name}</h3>
              <p>{owner.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;


// /public/about_img.webp