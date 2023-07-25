import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import NavBar from "./components/NavBar";
import SchedulePage from './components/Schedulepage';
import "./App.css"

import TodoPage from './components/TodoPage';
import Footer from './components/Footer';
import QuizHomePage from './components/QuizHomepage';

const App = () => {
    return (
        <>
        <NavBar />
        <div className='center'>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path='/list' element={<TodoPage />} />
            <Route path='/quiz' element={<QuizHomePage />} />
        </Routes>
        </div>
        <Footer/>
        </>
        
    );
};

export default App;