import React from 'react';
import '../styles/NavBar.css';
import profileIcon from '../assets/Ellipse 6.png';

const Navigation = () => {
  return (
    <div className='entire-navbar'>
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
          <a href="/profile" className="link">
            Profile
          </a>
            <div className="profile-icon-">
              <img src={profileIcon} alt="Profile" className="profile-icon" />
            </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navigation;
