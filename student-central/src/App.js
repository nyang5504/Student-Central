import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;