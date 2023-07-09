import React, { useState } from "react";
import NavBar from './NavBar';
import '../styles/Login.css';

// Main function for the form
const LoginForm = () => {
    const [formStrings, setFormStrings] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState("");

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

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formStrings),
            });

            if (response.ok) {
                console.log('Login successful');
            } else {
                setErrorMessage('Invalid username or password');
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
            <NavBar />
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
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
