import React from 'react';
import '../styles/Homepage.css';
import homepageicon from "../assets/homepage-icon.svg"

const HomePage = () => {
    return (
        <div className="homepage-container">
            <img src={homepageicon} alt='mySvgImage' />
            
        </div>
    );
};

export default HomePage;