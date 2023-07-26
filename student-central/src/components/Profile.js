import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import profileIcon from '../assets/profile-icon.PNG';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    //Render the data fetching for the async component
    useEffect(() => {
        fetchProfile();
    }, []);

    // Fetch user data
    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/profile', {
                method: 'GET',
                //Used for cookies
                credentials: 'include',
            });

            //If response from fetching user data is valid, update username 
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

    //Function to change password
    const changePassword = async (e) => {
        // Prevents page from refreshing
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:4000/api/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // JSON body request
            body: JSON.stringify({ username: user.username, password: pass, newPassword: newPass }),
            // Used for cookies
            credentials: 'include',
          });
          // If the response is valid, set the values
          if (response.ok) {
            setPass('');
            setNewPass('');
            setSuccessMsg('Password changed successfully.');
            setErrorMsg('');
          } else {
            const errorData = await response.json();
            setErrorMsg(errorData.error);
            setSuccessMsg('');
          }
        } catch (error) {
          console.error('Error changing password:', error);
          setErrorMsg('Failed to change password.');
          setSuccessMsg('');
        }
      };

    // Delete cookie and user session
    const signOut = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/sign-out', {
                method: 'POST',
                credentials: 'include',
            });

            // If cookie is deleted, the user is redirected to the login page
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
      <div className="profile-header">
        <img className="profile-icon" src={profileIcon} alt="Profile Icon" />
        <h2 className="title">Welcome, {user.username}</h2>
      </div>
      <div className="password-change">
        <form onSubmit={changePassword} className="profile-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <button className="change-password-btn" type="submit">
            Change Password
          </button>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
        <button className="sign-out-btn" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;

