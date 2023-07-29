import React from 'react';
import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';
import profileIcon from '../assets/Ellipse 6.png';

const Navigation = () => {
  return (
    <div className='entire-navbar'>
    <nav className="navigation">
      <div className="container">
        <NavLink to="/" className="logo">Student Central</NavLink>
        <div className="links">
          <NavLink
            style={({isActive}) => {return isActive ? {color: "#F6BE00", fontSize: "16px"} : {}}}
            to="/schedule" 
            className="link">
              Schedule
          </NavLink>
          <NavLink 
            style={({isActive}) => {return isActive ? {color: "#F6BE00", fontSize: "16px"} : {}}} 
            to="/list" 
            className="link">
              To-Do List
          </NavLink>
          <NavLink 
            style={({isActive}) => {return isActive ? {color: "#F6BE00", fontSize: "16px"} : {}}} 
            to="/quiz" 
            className="link">
              Quiz
          </NavLink>
          <NavLink 
            style={({isActive}) => {return isActive ? {color: "#F6BE00", fontSize: "16px"} : {}}} 
            to="/profile" 
            className="link">
              Profile
          </NavLink>
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
