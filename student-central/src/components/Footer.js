import React from 'react';
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <h2>About Us</h2>
      <div className="card-container">
        <div className="card">
          <h2 className='card-name'>Mohamed Barrie</h2>
          <p>I'm a Computer Science major in my senior year. I like I.T and Cybersecurity.</p>
        </div>
        <div className="card">
          <h2 className='card-name'>Nina Yang</h2>
          <p>A Computer Science major who's interested in Web and Mobile App development</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
