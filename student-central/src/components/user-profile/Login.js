import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user-profile/Login.css';

// Main function for the form
const LoginForm = () => {
    const [formStrings, setFormStrings] = useState({
        username: '',
        password: '',
    });

    //Declare variables
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Allows users to type in the form
    const handleInputChange = (e) => {
        setFormStrings({
            ...formStrings,
            [e.target.name]: e.target.value,
        });
    };

    // fetches post request so user data is sent to database
    const handleLogin = async (e) => {
        // stops page from refreshing
        e.preventDefault();
        // Check if username and password are entered
        if (!formStrings.username) {
            alert("Please enter a username.");
            return;
        }

        if (!formStrings.password) {
            alert("Please enter a password.");
            return;
        }
        
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formStrings),
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Login successful');
                //Redirects user to their profile page
                navigate('/profile');
            } else {
                setErrorMessage('Wrong username and password');
                //Resets form
                setFormStrings({
                    username: '',
                    password: '',
                });
            }
        } catch (error) {
            console.error('Error logging in: ', error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="title">Login</h2>
            <div className="form">
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formStrings.username}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formStrings.password}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Login</button>
                    {errorMessage && <p>{errorMessage}</p>}
                    <br />
                    <Link to={"/register"}>Don't Have an Account?</Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
