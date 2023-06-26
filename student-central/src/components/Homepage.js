import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/Homepage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <NavBar />
            <Footer />
        </div>
    );
};

export default HomePage;