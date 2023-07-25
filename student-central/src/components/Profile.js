import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/Profile.css';

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
            <h2 className="title">Hello, {user.username}</h2>
            <div className="password-change">
        <form onSubmit={changePassword} className='profile-form'>
          <div>
            <label>Current Password:</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>
          <div>
            <label>New Password:</label>
            <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          </div>
          <button id="change-password" type="submit">Change Password</button>
          {successMsg && <p>{successMsg}</p>}
          {errorMsg && <p>{errorMsg}</p>}
        </form>
            <button id="sign-out" onClick={signOut}>Sign Out</button>
        </div>
        </div>
    );
};

export default Profile;
