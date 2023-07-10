import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default App;