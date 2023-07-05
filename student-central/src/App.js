import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;