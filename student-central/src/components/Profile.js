import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/profile', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const profileData = await response.json();
                setUser(profileData);
            } else {
                console.error('Error fetching profile:', response.status);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const signOut = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/sign-out', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/login');
            } else {
                console.error('Error signing out:', response.status);
            }
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="profile-container">
            <NavBar />
            <h2 className="title">Hello, {user.username}</h2>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default Profile;
