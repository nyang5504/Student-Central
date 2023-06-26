import React from 'react';
import '../styles/NavBar.css';
import profileIcon from '../assets/Ellipse 6.png';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="container">
        <a href="/" className="logo">
          Student Central
        </a>
        <div className="links">
          <a href="/schedule" className="link">
            Schedule
          </a>
          <a href="/list" className="link">
            To-Do List
          </a>
          <a href="/quiz" className="link">
            Quiz
          </a>
          <div className="profile-link">
          <span className="profile-text">Profile</span>
            <div className="profile-icon-">
              <img src={profileIcon} alt="Profile" className="profile-icon" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
