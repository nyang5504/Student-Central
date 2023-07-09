import React, { useState } from "react";
import NavBar from './NavBar';
import '../styles/Register.css';

// Main function for the form
const Registerform = () => {
    const [formStrings, setFormStrings] = useState({
        username: '',
        password: '',
        confirmPassword: '',
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
    const handleRegister = async (e) => {
        // stops page from refreshing
        e.preventDefault();

        if (formStrings.password !== formStrings.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(formStrings),
            });

            if (response.ok) {
                console.log('Sign up was successful')
            } else {
                setErrorMessage('Error registering, try again');
                setFormStrings({
                    username: '',
                    password: '',
                    confirmPassword: '',
                });
            }
        } catch (error) {
            console.error('Error registering: ', error);
        }
    };


    return (
        <div className="register-container">
            <NavBar />
            <h2 className="title">Sign Up</h2>
            <div className="form">
                <form onSubmit={handleRegister}>
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

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formStrings.confirmPassword}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Sign Up</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Registerform;