import React from 'react';
import '../styles/FooterNew.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h2>About Us</h2>
      <div className="card-container">
        <div className="card">
            <h2>Mohamed Barrie</h2>
        </div>
        <div className="card">
            <h2>Mary Tang</h2>
        </div>
        <div className="card">
        <h2>Nina Yang</h2>
        </div>
        <div className="card">
            <h2>Navkiran Kaur</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
